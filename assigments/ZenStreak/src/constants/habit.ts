export type Frequency = "daily" | "weekly";

export interface Habit {
  id: string;

  title: string;

  emoji: string;

  frequency: Frequency;

  weekdays?: number[];

  reminderHour: number;

  reminderMinute: number;

  streak: number;

  reminderMode?: "once" | "interval";
  intervalHours?: number;

  longestStreak: number;

  lastCompletedDate: string | null;

  notificationIds: string[];

  completedToday: boolean;

  createdAt: string;
}