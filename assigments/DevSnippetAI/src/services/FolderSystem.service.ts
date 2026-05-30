import { Directory, Paths, File } from "expo-file-system";

export const rootDirectory = new Directory(Paths.document,"devsnippets");

export const initializeStorage = async () => {
  try {
    if (!rootDirectory.exists) {
      rootDirectory.create();
    }

    console.log("Storage initialized");
  } catch (error) {
    console.log("Storage Error:", error);
  }
};

export const createFolder = async (folderName: string) => {
  try {
    const folder = new Directory(rootDirectory,folderName);

    if (!folder.exists) {
      folder.create();
    }
    console.log(folder.uri)
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getFolders = () => {
  try {
    return rootDirectory.list();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteFolder = (folderName: string) => {
  try {
    const folder = new Directory(rootDirectory, folderName);
    folder.delete();

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

