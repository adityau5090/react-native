import { useMemo } from "react";
import { useDriveStore } from "@/store/driveStore";

export function useDriveStats() {
  const activeSession = useDriveStore(state => state.activeSession);

  const events = activeSession?.events || [];

  return useMemo(() => ({
    brakeCount: events.filter(e => e.type === "harsh_brake").length,

    turnCount: events.filter(e => e.type === "sharp_turn").length,

    phoneCount: events.filter(e => e.type === "phone_handling").length,

    movementCount: events.filter(e => e.type === "device_movement").length,

    steeringCount: events.filter(e => e.type === "aggressive_steering").length,
    
  }), [events]);
}