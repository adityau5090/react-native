import { useMemo } from "react";
import { calculateScore } from "@/services/scoring/scoreEngine";
import { useDriveStore } from "@/store/driveStore";

export function useDriveScore() {
  const activeSession = useDriveStore((state) => state.activeSession);

  return useMemo(() => {
    const events = activeSession?.events ?? [];

    return calculateScore(events);
  }, [activeSession]);
}