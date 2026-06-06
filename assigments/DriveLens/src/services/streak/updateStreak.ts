import {
  getStreak,
  saveStreak,
} from "@/storage/streakStorage";

import {
  getToday,
  daysBetween,
} from "@/utils/date";

export async function updateStreak() {
  const streak = await getStreak();

  const today = getToday();

  if (streak.lastDriveDate === today) {
    return streak;
  }

  let currentStreak = 1;

  if (streak.lastDriveDate) {
    const diff = daysBetween(streak.lastDriveDate,today);

    if (diff === 1) {
      currentStreak = streak.currentStreak + 1;
    }

    if (diff > 1) {
      currentStreak = 1;
    }
  }

  const updated = {
    ...streak,

    bestStreak: Math.max(streak.bestStreak, currentStreak),

    currentStreak,

    lastDriveDate: today,
    completedCycle: currentStreak >= 6,  
  };

  await saveStreak(updated);

  return updated;
}