import { useMemo } from "react";
import { DriveSession } from "@/types/drive";

export function useHistoryAnalytics(
  sessions: DriveSession[]
) {
  return useMemo(() => {
    const totalDrives = sessions.length;

    const totalXP =
      sessions.reduce(
        (acc, session) =>
          acc + session.score,
        0
      );

    const averageScore =
      totalDrives > 0
        ? Math.round(
            totalXP /
              totalDrives
          )
        : 0;

    const bestScore =
      Math.max(
        ...sessions.map(
          (s) => s.score
        ),
        0
      );

    return {
      totalDrives,
      totalXP,
      averageScore,
      bestScore,
    };
  }, [sessions]);
}