import { db } from "./database";
import { Habit } from "@/constants/habit";

export function createHabit(habit: Habit) {
  db.runSync(
    `
      INSERT INTO habits (
        id,
        title,
        emoji,
        frequency,
        weekdays,
        reminderHour,
        reminderMinute,
        streak,
        longestStreak,
        lastCompletedDate,
        notificationIds,
        createdAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      habit.id,
      habit.title,
      habit.emoji,
      habit.frequency,
      JSON.stringify(habit.weekdays),
      habit.reminderHour,
      habit.reminderMinute,
      habit.streak,
      habit.longestStreak,
      habit.lastCompletedDate,
      JSON.stringify(habit.notificationIds),
      habit.createdAt,
    ]
  );
}

export function getAllHabits() {
  const habits = db.getAllSync(`
    SELECT * FROM habits
    ORDER BY createdAt DESC
  `);
  return habits.map((habit: any) => ({
    ...habit,

    weekdays: JSON.parse(habit.weekdays || "[]"),

    notificationIds: JSON.parse(
      habit.notificationIds || "[]"
    ),
  }));
}

export function deleteHabit(id: string) {
  db.runSync(
    `DELETE FROM habits WHERE id = ?`,
    [id]
  );
}

export function updateHabitCompletion(
  id: string,
  streak: number,
  longestStreak: number,
  lastCompletedDate: string
) {
  db.runSync(
    `
      UPDATE habits
      SET
        streak = ?,
        longestStreak = ?,
        completedToday = 1,
        lastCompletedDate = ?
      WHERE id = ?
    `,
    [
      streak,
      longestStreak,
      lastCompletedDate,
      id,
    ]
  );
}

export function updateHabitProgress(
  id: string,
  streak: number,
  longestStreak: number,
  lastCompletedDate: string | null
) {
  db.runSync(
    `
      UPDATE habits
      SET
        streak = ?,
        longestStreak = ?,
        lastCompletedDate = ?
      WHERE id = ?
    `,
    [
      streak,
      longestStreak,
      lastCompletedDate,
      id,
    ]
  );
}

export function saveCompletion(
  habitId: string,
  completedDate: string
) {
  const existing = db.getFirstSync(
    `
    SELECT * FROM habit_completions
    WHERE habitId = ?
    AND completedDate = ?
    `,
    [habitId, completedDate]
  );

  if (existing) return;
  db.runSync(
    `
      INSERT INTO habit_completions (
        habitId,
        completedDate
      )
      VALUES (?, ?)
    `,
    [habitId, completedDate]
  );
}

export function getCompletionHistory() {
  const data = db.getAllSync(`
    SELECT
      completedDate,
      COUNT(*) as count
    FROM habit_completions
    GROUP BY completedDate
  `);

  // console.log("Completion History:", data);

  return data;
}