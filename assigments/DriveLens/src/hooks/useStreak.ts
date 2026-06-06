import {
  useEffect,
  useState,
} from "react";

import {
  getStreak,
  StreakData,
} from "@/storage/streakStorage";

export function useStreak() {
  const [
    streak,
    setStreak,
  ] = useState<StreakData>({
    currentStreak: 0,

    lastDriveDate: null,

    completedCycle: false,
  });

  async function load() {
    const data =
      await getStreak();

    setStreak(data);
  }

  useEffect(() => {
    load();
  }, []);

  return {
    streak,

    refresh: load,
  };
}