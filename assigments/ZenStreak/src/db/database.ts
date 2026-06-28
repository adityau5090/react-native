import * as SQLite from "expo-sqlite";
import { isToday } from "date-fns";

export const db = SQLite.openDatabaseSync("zenstreak.db");


function resetDailyHabits() {
  const habits = db.getAllSync(
    `SELECT id, lastCompletedDate FROM habits`
  );

  habits.forEach((habit: any) => {
    const completedToday =
      habit.lastCompletedDate &&
      isToday(
        new Date(habit.lastCompletedDate)
      );

    if (!completedToday) {
      db.runSync(
        `
        UPDATE habits
        SET completedToday = 0
        WHERE id = ?
      `,
        [habit.id]
      );
    }
  });
}
export async function initDB() {
   db.execSync(`
    CREATE TABLE IF NOT EXISTS habits (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      emoji TEXT NOT NULL,
      frequency TEXT NOT NULL,
      weekdays TEXT,
      reminderHour INTEGER,
      reminderMinute INTEGER,
      streak INTEGER DEFAULT 0,
      longestStreak INTEGER DEFAULT 0,
      lastCompletedDate TEXT,
      completedToday INTEGER DEFAULT 0,
      notificationIds TEXT,
      createdAt TEXT
    );

  `);

  
  db.execSync(`
  CREATE TABLE IF NOT EXISTS habit_completions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    habitId TEXT NOT NULL,
    completedDate TEXT NOT NULL
  );
`);

    resetDailyHabits()
} 