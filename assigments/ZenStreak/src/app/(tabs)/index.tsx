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
import { useAuthStore } from "@/store/auth.store";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function HomeScreen() {
  
  const colors = useTheme();
  const greeting = getGreeting();
  const logout = useAuthStore(state => state.logout);
 
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const mode = useThemeStore((state) => state.mode)

  const habits = useHabitStore((state) => state.habits)
  const setHabits = useHabitStore((state) => state.setHabits)

  const handleLogout = async () => {
  await GoogleSignin.signOut();

  await logout();

  router.replace("/auth/login");
};
  useFocusEffect(
    React.useCallback(() => {
      const data = getAllHabits();
      setHabits(data as any)
    }, [])
  )
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}  >
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

            <Pressable
              onPress={toggleTheme}
              style={[
                styles.themeButton,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons
                name={mode === "dark" ? "sunny" : "moon"}
                size={22}
                color={colors.text}
              />
            </Pressable>
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
            0 Days
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              marginTop: 10,
            }}
          >
            Longest Streak: 12 days
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

        <Button title="habit page" onPress={() => router.push("/habit/new")} />
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

  themeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
  },

  cardTitle: {
    fontSize: 18,
  },

  streak: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 12,
  },
});