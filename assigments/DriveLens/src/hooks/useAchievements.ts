import { useMemo } from "react";

import { useDriveHistory } from "./useDriveHistory";
import { useStreak } from "./useStreak";
import { useXP } from "./useXP";

export function useAchievements() {
  const { sessions } =
    useDriveHistory();

  const { streak } =
    useStreak();

  const { xp } =
    useXP();

  return useMemo(() => {
    const totalDistance =
      sessions.reduce(
        (acc, session) =>
          acc +
          (session.distance ??
            0),
        0
      );

    const perfectDrive =
      sessions.some(
        (session) =>
          session.score ===
          100
      );

    return [
      {
        id: "first_drive",

        title:
          "First Drive",

        description:
          "Complete your first drive",

        unlocked:
          sessions.length >=
          1,
      },

      {
        id: "streak_7",

        title:
          "7 Day Streak",

        description:
          "Drive safely for 7 days",

        unlocked:
          streak.currentStreak >=
          7,
      },

      {
        id: "perfect_drive",

        title:
          "Perfect Drive",

        description:
          "Finish with score 100",

        unlocked:
          perfectDrive,
      },

      {
        id: "100_km",

        title:
          "100 KM Club",

        description:
          "Drive 100 KM total",

        unlocked:
          totalDistance >=
          100,
      },

      {
        id: "xp_1000",

        title:
          "1000 XP",

        description:
          "Earn 1000 XP",

        unlocked:
          xp >= 1000,
      },
    ];
  }, [
    sessions,
    streak,
    xp,
  ]);
}