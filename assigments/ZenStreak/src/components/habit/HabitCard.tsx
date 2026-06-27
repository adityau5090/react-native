import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

import { GlassCard } from "../ui/GlassCard";
import { useTheme } from "@/theme";
import { Habit } from "@/constants/habit";
import { Alert } from "react-native";
import { calculateStreak } from "@/utils/streak";
import { saveCompletion, updateHabitProgress } from "@/db/habits.repository";
import { useHabitStore } from "@/store/habit.store";
import { deleteHabit } from "@/db/habits.repository";
import { cancelNotifications } from "@/lib/notifications/schedular";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  habit: Habit;
}

const HabitCard = ({ habit }: Props) => {
  const colors = useTheme();

  const updateHabit = useHabitStore((state) => state.updateHabit)
  const removeHabit = useHabitStore((state) => state.removeHabit)

  
  const handleComplete = () => {
    const result = calculateStreak(habit.streak, habit.longestStreak, habit.lastCompletedDate)

    if(!result) {
      Alert.alert(
        "Already Completed",
      "You already completed this habit today."
      )
      return;
    }
     
    updateHabitProgress(habit.id, result.streak, result.longestStreak, result.lastCompletedDate)

    updateHabit(habit.id, {...result, completedToday: true})

    const completionDate =
  result.lastCompletedDate!
    .split("T")[0];

    saveCompletion(habit.id, completionDate!)
    // console.log("Save completion : ", habit.id, result.lastCompletedDate)
  }

  const handleDelete = () => {
  Alert.alert(
    "Delete Habit",
    `Delete ${habit.title}?`,
    [
      {
        text: "Cancel",
        style: "cancel",
      },

      {
        text: "Delete",

        style: "destructive",

        onPress: async () => {
          await cancelNotifications(
            habit.notificationIds || []
          );

          deleteHabit(habit.id);

          removeHabit(habit.id);
        },
      },
    ]
  );
};

const hour =
  habit.reminderHour % 12 || 12;

const period =
  habit.reminderHour >= 12 ? "PM" : "AM";

const formattedTime = `${hour}:${habit.reminderMinute
  .toString()
  .padStart(2, "0")} ${period}`;



  return (
    <GlassCard>
      <Text style={styles.emoji}>{habit.emoji}</Text>

      <Text
        style={[
          styles.title,
          { color: colors.text },
        ]}
      >
        {habit.title}
      </Text>

      <Text
        style={[
          styles.subtitle,
          { color: colors.textSecondary },
        ]}
      >
        {habit.frequency === "daily"
          ? "Daily"
          : `Weekly • ${(habit.weekdays ?? []).length} days`}
        {" • "}
        {formattedTime}
      </Text>

      <View style={styles.footer}>
        <Text
          style={[
            styles.streak,
            { color: colors.primary },
          ]}
        >
          🔥 {habit.streak} days
        </Text>

        <View style={styles.actions}>
  <Pressable
    onPress={handleDelete}
  >
    <Ionicons
      name="trash-outline"
      size={22}
      color="#ff4d4d"
    />
  </Pressable>

  <Pressable
    onPress={handleComplete}
    style={[
      styles.doneButton,
      {
        backgroundColor: colors.primary,
      },
    ]}
  >
    <Text style={styles.doneText}>
      Done
    </Text>
  </Pressable>
</View>
      </View>
    </GlassCard>
  );
}

export { HabitCard }

const styles = StyleSheet.create({
  emoji: {
    fontSize: 36,
  },

  title: {
    marginTop: 7,
    fontSize: 22,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 6,
  },

  footer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  streak: {
    fontWeight: "600",
  },
  actions: {
  flexDirection: "row",
  alignItems: "center",
  gap: 18,
},

  doneButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },

  doneText: {
    color: "#fff",
    fontWeight: "700",
  },
});