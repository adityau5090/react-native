import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("zenstreak.db");

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
} 