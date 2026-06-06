import AsyncStorage from "@react-native-async-storage/async-storage";

const STREAK_KEY = "user_streak";

export type StreakData = {
  currentStreak: number;
  bestStreak: number;
  lastDriveDate: string | null;
  completedCycle: boolean;
};

export async function getStreak() {
  const value =
    await AsyncStorage.getItem(
      STREAK_KEY
    );

  if (!value) {
    return {
      currentStreak: 0,
      bestStreak: 0,
      lastDriveDate: null,

      completedCycle: false,
    };
  }

  return JSON.parse(value);
}

export async function saveStreak(data: StreakData) {
  await AsyncStorage.setItem(STREAK_KEY,JSON.stringify(data));
}