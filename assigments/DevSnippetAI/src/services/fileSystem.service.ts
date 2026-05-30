import { Directory, File } from "expo-file-system";
import { rootDirectory } from "./FolderSystem.service";

export const createTextFile = async (folderName: string, fileName: string, content: string) => {
  try {

    const folder = new Directory(rootDirectory, folderName);
    if (!folder.exists) {
      folder.create();
    }
    const file = new File(folder, fileName);
    if (!file.exists) {
      file.create();
    }
    file.write(content);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const readTextFile = async (folderName: string, fileName: string) => {
  try {
    const folder = new Directory(rootDirectory, folderName);

    const file = new File(folder, fileName);

    return file.text();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFilesInFolder = (folderName: string) => {
  try {
    const folder = new Directory(
      rootDirectory,
      folderName
    );

    return folder.list();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getFileContent = (folderName: string, fileName: string) => {
  try {
    const folder = new Directory(rootDirectory, folderName);

    const file = new File(folder, fileName);

    return {
      name: file.name,
      content: file.textSync()
    };
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const getFilePath = (
  folderName: string,
  fileName: string
) => {
  const folder =
    new Directory(
      rootDirectory,
      folderName
    );

  const file =
    new File(
      folder,
      fileName
    );

  return file.uri;
};

export const deleteFile = (
  folderName: string,
  fileName: string
) => {
  try {
    const folder =
      new Directory(
        rootDirectory,
        folderName
      );

    const file =
      new File(
        folder,
        fileName
      );

    if (file.exists) {
      file.delete();
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
