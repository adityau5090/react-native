import {differenceInCalendarDays,isToday} from "date-fns";

export function calculateStreak(
  currentStreak: number,
  longestStreak: number,
  lastCompletedDate: string | null
) {
  const today = new Date();

  // Already completed today
  if (
    lastCompletedDate &&
    isToday(new Date(lastCompletedDate))
  ) {
    return null;
  }

  let newStreak = 1;

  if (lastCompletedDate) {
    const daysDifference =
      differenceInCalendarDays(
        today,
        new Date(lastCompletedDate)
      );

    if (daysDifference === 1) {
      newStreak = currentStreak + 1;
    }
  }

  const newLongest = Math.max(
    longestStreak,
    newStreak
  );

  return {
    streak: newStreak,
    longestStreak: newLongest,
    lastCompletedDate:
      today.toISOString(),
  };
}