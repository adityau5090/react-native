import { DriveEvent } from "@/types/drive";
import { EVENT_PENALTIES } from "@/constants/scoring";

export function calculateScore(
  events: DriveEvent[]
) {
  let score = 100;

  for (const event of events) {
    score -= EVENT_PENALTIES[event.type];
  }

  return Math.max(score, 0);
}