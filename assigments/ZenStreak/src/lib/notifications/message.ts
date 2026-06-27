import { Habit } from "@/constants/habit";

export function getMotivationalMessage(habit: Habit) {
  const streak = habit.streak;

  if (streak === 0) {
    return `🌱 Start your journey with ${habit.title} today!`;
  }

  if (streak === 1) {
    return `🔥 Keep the momentum going!`;
  }

  if (streak === 6) {
    return `🏆 One more day for a 7-day streak!`;
  }

  if (streak === habit.longestStreak) {
    return `🚀 You're matching your best streak!`;
  }

  if (streak >= 30) {
    return `👑 Incredible! ${streak} days strong!`;
  }

  return `🔥 Don't lose your ${streak}-day streak!`;
}