export const createSnippetTable = `
CREATE TABLE IF NOT EXISTS snippets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  code TEXT NOT NULL,
  language TEXT,
  tags TEXT,
  imagePath TEXT,
  favorite INTEGER DEFAULT 0,
  createdAt TEXT
);
`;
