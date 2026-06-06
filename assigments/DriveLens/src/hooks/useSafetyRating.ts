import { useMemo } from "react";
import { useDriveScore } from "./useDriveScore";
import { getSafetyRating } from "@/services/scoring/ratingEngine";

export function useSafetyRating() {
  const score = useDriveScore();

  return useMemo(
    () => getSafetyRating(score),
    [score]
  );
}