import { useMemo } from "react";
import { useDriveStore } from "@/store/driveStore";
import { calculateScore } from "@/services/scoring/scoreEngine";
import { getSafetyRating } from "@/services/scoring/ratingEngine";

export function useDriveSummary() {
  const lastCompletedSession = useDriveStore((state) => state.lastCompletedSession);

  return useMemo(() => {
    if (!lastCompletedSession) {return null}

    const events = lastCompletedSession.events;
    const distance = lastCompletedSession.distance ?? 0;

    const score = calculateScore(events);
    const rating = getSafetyRating(score);

    const movementCount = events.filter((e) => e.type === "device_movement").length;
    const brakeCount = events.filter((e) => e.type === "harsh_brake").length;
    const turnCount = events.filter((e) =>e.type === "sharp_turn").length;
    const phoneCount = events.filter((e) => e.type === "phone_handling").length;
    const sharpTurn = events.filter((e) => e.type === "sharp_turn").length;
    const aggressiveSteering = events.filter((e) => e.type === "aggressive_steering").length;
    const pointsEarned = score;

    return {
      session:
        lastCompletedSession,
        score,
        rating,
        pointsEarned,
        totalEvents:
        events.length,
        movementCount,
        brakeCount,
        turnCount,
        phoneCount,
        sharpTurn,
        aggressiveSteering,
        distance
    };
  }, [lastCompletedSession]);
}