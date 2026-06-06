import {
  getStreak,
  saveStreak,
} from "@/storage/streakStorage";

import { addXP } from "../xp/addXP";

export async function claimStreakReward() {
  const streak = await getStreak();

  if (!streak.completedCycle) return;

  await addXP(500);

  await saveStreak({
    ...streak,

    currentStreak: 0,

    completedCycle: false,
  });
}