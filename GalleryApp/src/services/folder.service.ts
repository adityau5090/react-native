import { db } from "@/database/database";

export function createFolder(name: string) {
  db.runSync(
    `
      INSERT INTO folders
      (name, createdAt)
      VALUES (?, ?)
    `,
    [name, new Date().toISOString()]
  );
}

export function getFolders() {
  return db.getAllSync(
    `SELECT * FROM folders
     ORDER BY createdAt DESC`
  );
}

export function deleteFolder(
  id: number
) {
  db.runSync(
    `DELETE FROM folders
     WHERE id = ?`,
    [id]
  );
}

export function addPhotosToFolder(folderId: number, photos: {id: string;uri: string;}[]) {
  photos.forEach((photo) => {
    db.runSync(
      `
      INSERT INTO folder_photos
      (folderId, photoId, photoUri)
      VALUES (?, ?, ?)
      `,
      [
        folderId,
        photo.id,
        photo.uri,
      ]
    );
  });
}

export function getFolderPhotos(
  folderId: number
) {
  return db.getAllSync(
    `
    SELECT *
    FROM folder_photos
    WHERE folderId = ?
    `,
    [folderId]
  );
}