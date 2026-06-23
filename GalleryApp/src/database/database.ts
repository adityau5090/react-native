import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("auragallery.db");

export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS folders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS folder_photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      folderId INTEGER NOT NULL,
      photoId TEXT NOT NULL,
      photoUri TEXT NOT NULL,

      FOREIGN KEY(folderId)
      REFERENCES folders(id)
    );
  `);
}