import * as SQLite from "expo-sqlite";
import { createSnippetTable } from "./schema";

const db = SQLite.openDatabaseSync("devsnippets.db");

export const initDatabase = async () => {
  try {
    await db.execAsync(createSnippetTable);
    console.log("Database initialized");

  } catch (error) {
    console.log("DB Error:", error);
  }
};

export default db;