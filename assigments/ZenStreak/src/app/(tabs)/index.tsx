import { Text, View, StyleSheet, Pressable, ScrollView, Button } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Screen from "@/components/ui/Screen";
import { GlassCard } from "@/components/ui/GlassCard";
import { useTheme } from "@/theme";
import { useThemeStore } from "@/store/useThemeStore";
import { HabitCard } from "@/components/habit/HabitCard";
import ProgressCard from "@/components/habit/ProgressCard";
import { getGreeting } from "@/utils/getGreetings";
import { router } from "expo-router";
import { getAllHabits } from "@/db/habits.repository";
import { useHabitStore } from "@/store/habit.store";
import { useFocusEffect } from "expo-router";
import React, { useEffect } from "react";

export default function HomeScreen() {
  
  const colors = useTheme();
  const greeting = getGreeting();

  const habits = useHabitStore((state) => state.habits)
  const setHabits = useHabitStore((state) => state.setHabits)

  const currentStreak = Math.max(...habits.map((h) => h.streak),0);
  const longestStreak = Math.max(...habits.map((h) => h.longestStreak),0);

  const totalHabits = habits.length;
  const completedToday = habits.filter((habit) => habit.completedToday === true).length;
  const completionPercentage = totalHabits === 0 ? 0 : Math.round((completedToday / totalHabits) * 100);

  // console.log("Habits:", habits);
  
  useFocusEffect(
  React.useCallback(() => {
    const data = getAllHabits();

    // console.log("DB Habits:", data);

    setHabits(data as any);
  }, [])
);
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} 
      style={{ marginBottom : 60 }} >
        <View style={styles.header}>
          <View style={styles.row}>
            <View>
              <Text
                style={[
                  styles.title,
                  { color: colors.text },
                ]}
              >
                {greeting}👋
              </Text>

              <Text
                style={[
                  styles.subtitle,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                Start building your streak.
              </Text>
              <Text
                style={{
                  color: colors.primary,
                  marginTop: 5,
                  fontSize: 16,
                  fontStyle: "normal",
                }}
              >
                "Small habits become big results"
              </Text>
            </View>
          </View>
        </View>

        <ProgressCard />

        
        <GlassCard>
          <Text
            style={[
              styles.cardTitle,
              { color: colors.text },
            ]}
          >
            🔥 Current Streak
          </Text>

         <Text
  style={[
    styles.streak,
    { color: colors.text },
  ]}
>
  {currentStreak} Days
</Text>

<Text
  style={{
    color: colors.textSecondary,
    marginTop: 10,
  }}
>
  Longest Streak: {longestStreak} days
</Text>
        </GlassCard>

        <Text
          style={{
            color: colors.text,
            fontSize: 22,
            fontWeight: "700",
            marginTop: 15,
            marginBottom: 10,
            paddingLeft: 10
          }}
        >
          Today's Habits
        </Text>

        {/* Habit card */}
        {habits.length === 0 ? (
          <GlassCard>
            <Text
              style={{
                color: colors.text,
                textAlign: "center",
              }}
            >
              No habits yet.
            </Text>

            <Text
              style={{
                color: colors.textSecondary,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Create your first habit 🚀
            </Text>
          </GlassCard>
        ) : (
          habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
            />
          ))
        )}

        <Pressable
          style={[
            styles.createButton,
            {
              backgroundColor: colors.primary,
            },
          ]}
          onPress={() => router.push("/habit/new")}
        >
          <Ionicons
            name="add-circle-outline"
            size={24}
            color="#fff"
          />

          <Text style={styles.createButtonText}>
            Create New Habit
          </Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginBottom: 30,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 8,
  },

  cardTitle: {
    fontSize: 18,
  },

  streak: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 12,
  },
  createButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",

  paddingVertical: 16,
  borderRadius: 24,

  marginTop: 20,
  marginBottom: 100,

  gap: 10,

  elevation: 5,
},

createButtonText: {
  color: "#fff",
  fontSize: 17,
  fontWeight: "700",
},
});