import { useMemo } from "react";

import { useDriveHistory } from "./useDriveHistory";
import { useXP } from "./useXP";
import { useStreak } from "./useStreak";
import { useAchievements } from "./useAchievements";

export function useProfileStats() {
  const { sessions } = useDriveHistory();
  const { xp } = useXP();
  const { streak } = useStreak();
  const achievements = useAchievements();

  return useMemo(() => {
    const totalDrives = sessions.length;

    const totalDistance = sessions.reduce(
      (acc, session) =>
        acc + (session.distance ?? 0),
      0
    );

    const bestScore = Math.max(
      ...sessions.map(
        (session) => session.score
      ),
      0
    );

    const averageScore =
      totalDrives > 0
        ? Math.round(
            sessions.reduce(
              (acc, session) =>
                acc + session.score,
              0
            ) / totalDrives
          )
        : 0;

    const achievementsUnlocked =
      achievements.filter(
        (achievement) =>
          achievement.unlocked
      ).length;

    return {
      totalDrives,
      totalDistance,
      bestScore,
      averageScore,
      xp,
      streak:
        streak.currentStreak,
      achievementsUnlocked,
    };
  }, [
    sessions,
    xp,
    streak,
    achievements,
  ]);
}