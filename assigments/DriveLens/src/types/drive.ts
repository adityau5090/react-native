export type DriveEventType =
  | "harsh_brake"
  | "harsh_acceleration"
  | "sharp_turn"
  | "aggressive_steering"
  | "phone_handling"
  | "device_movement";

export interface DriveEvent {
  id: string;

  type: DriveEventType;

  timestamp: number;

  severity?: number;
}

export interface DriveSession {
  id: string;
  startedAt: number;
  endedAt?: number;
  duration: number;
  score: number;
  distance: number;
  events: DriveEvent[];
}