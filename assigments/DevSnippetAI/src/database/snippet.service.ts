import db from "./db";

export interface CreateSnippetDTO {
    title: string;
    code: string;
    language: string;
    tags: string;
    imagePath?: string
}

export const createSnippet = async (data: CreateSnippetDTO) => {
    try {
        await db.runAsync(
            `
      INSERT INTO snippets
      (
        title,
        code,
        language,
        tags,
        imagePath,
        createdAt
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
            [
                data.title,
                data.code,
                data.language,
                data.tags,
                data.imagePath ?? null,
                new Date().toISOString(),
            ]
        );

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const getSnippets = async () => {
    try {
        const result = await db.getAllAsync(`SELECT * FROM snippets ORDER BY id DESC`)

        return (result);
    } catch (error) {
        console.log("Error in fetching snippets :", error)
        return [];
    }
}

export const getSnippetById = async (id: number) => {
    try {
        const result = await db.getFirstAsync(`SELECT * FROM snippets WHERE id = ?`, [id])
        return (result)
    } catch (error) {
        console.log("Error in fetching snippet :", error)
        return null;
    }
}

export const deleteSnippet = async (id: number) => {
    try {
        await db.runAsync(`DELETE FROM snippets WHERE id = ?`, [id])
        return true
    } catch (error) {
        console.log("Error in deleting snippet :", error)
        return false;
    }
}

export const toggleFavorite = async (id: number, currentValue: number) => {
    try {
        await db.runAsync(`UPDATE snippets SET favorite = ? WHERE id = ? `, [currentValue === 1 ? 0 : 1, id])
        return true
    } catch (error) {
        console.log("Error in toggling favorite :", error)
        return false;
    }
}

export const getFavorites = async () => {
    try {
        const result = await db.getAllAsync(`SELECT * FROM snippets WHERE favorite = 1 ORDER BY id DESC`)
        // console.log("result : ", result)
        return result;
    } catch (error) {
        console.log("Error in getting favorites :", error)
        return [];
    }
}

export const updateSnippet = async (
    id: number,
    title: string,
    code: string,
    language: string,
    tags: string
) => {
    try {
        await db.runAsync(
            `UPDATE snippets SET title = ?, code = ?, language = ?, tags = ? WHERE id = ?`,
            [title, code, language, tags, id]
        );

        return true;
    } catch (error) {
        console.log(
            "Update Error:",
            error
        );
        return false;
    }
};

export const searchSnippets = async (searchText: string) => {
  try {
    const result = await db.getAllAsync(
      `SELECT * FROM snippets WHERE title LIKE ? OR language LIKE ? OR tags LIKE ? ORDER BY id DESC `,
      [
        `%${searchText}%`,
        `%${searchText}%`,
        `%${searchText}%`,
      ]
    );

    return result;
  } catch (error) {
    console.log(
      "Search Error:",
      error
    );

    return [];
  }
};

export const getTotalSnippets = async () => {
  const result = await db.getFirstAsync<{count: number}>(
    `SELECT COUNT(*) as count FROM snippets`
  );

  return result?.count || 0;
};

export const getTotalFavorites = async () => {
  const result = await db.getFirstAsync<{count: number;}>(
    `SELECT COUNT(*) as count FROM snippets WHERE favorite = 1`
  );

  return result?.count || 0;
};