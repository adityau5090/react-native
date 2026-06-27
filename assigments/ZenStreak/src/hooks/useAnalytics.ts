import { useMemo } from "react";
import { useHabitStore } from "@/store/habit.store";

export const useAnalytics = () => {
  const habits = useHabitStore(
    (state) => state.habits
  );

  return useMemo(() => {
    const totalHabits = habits.length;

    const currentStreak = Math.max(
      ...habits.map((h) => h.streak || 0),
      0
    );

    const longestStreak = Math.max(
      ...habits.map(
        (h) => h.longestStreak || 0
      ),
      0
    );

    const completedToday = habits.filter(
      (h) => h.completedToday
    ).length;

    const completionRate =
      totalHabits === 0
        ? 0
        : Math.round(
            (completedToday /
              totalHabits) *
              100
          );

    return {
      totalHabits,
      currentStreak,
      longestStreak,
      completedToday,
      completionRate,
    };
  }, [habits]);
};