import { View, Text, StyleSheet } from "react-native";

import { GlassCard } from "@/components/ui/GlassCard";
import { useTheme } from "@/theme";

import { useHabitStore } from "@/store/habit.store";

export default function ProgressCard() {
  const colors = useTheme();

  const habits = useHabitStore(
    (state) => state.habits
  );

  const totalHabits = habits.length;

  const completedHabits = habits.filter(
    (habit) => habit.completedToday
  ).length;

  const percentage =
    totalHabits === 0
      ? 0
      : Math.round(
          (completedHabits / totalHabits) * 100
        );

  return (
    <GlassCard>
      <Text
        style={[
          styles.title,
          { color: colors.text },
        ]}
      >
        Today's Progress
      </Text>

      <View
        style={[
          styles.progressBackground,
          {
            backgroundColor: colors.border,
          },
        ]}
      >
        <View
          style={[
            styles.progressFill,
            {
              width: `${percentage}%`,
              backgroundColor: colors.primary,
            },
          ]}
        />
      </View>

      <Text
        style={[
          styles.progressText,
          { color: colors.textSecondary },
        ]}
      >
        {completedHabits} / {totalHabits} habits completed
      </Text>

      <Text
        style={[
          styles.percent,
          { color: colors.primary },
        ]}
      >
        {percentage}%
      </Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  progressBackground: {
    height: 12,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 20,
  },

  progressFill: {
    height: "100%",
    borderRadius: 8,
  },

  progressText: {
    marginTop: 15,
  },

  percent: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: "700",
  },
});