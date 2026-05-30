import { Directory, File } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { rootDirectory } from "./FolderSystem.service";

export const exportAsText = async (title: string, code: string) => {
  try {
    const exportFolder = new Directory(rootDirectory, "exports");

    if (!exportFolder.exists) {
      exportFolder.create();
    }

    const file = new File(exportFolder, `${title}.txt`);

    if (!file.exists) {
      file.create();
    }

    file.write(code);

    await Sharing.shareAsync(file.uri);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const exportAsJS = async (title: string, code: string) => {
  try {
    const exportFolder = new Directory(rootDirectory, "exports");

    if (!exportFolder.exists) {
      exportFolder.create();
    }

    const file = new File( exportFolder, `${title}.js`);

    if (!file.exists) {
      file.create();
    }

    file.write(code);

    await Sharing.shareAsync(file.uri);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};


export const exportAsJSON = async (
  snippet: any
) => {
  try {
    const exportFolder =
      new Directory(
        rootDirectory,
        "exports"
      );

    if (!exportFolder.exists) {
      exportFolder.create();
    }

    const file = new File(
      exportFolder,
      `${snippet.title}.json`
    );

    if (!file.exists) {
      file.create();
    }

    file.write(
      JSON.stringify(
        snippet,
        null,
        2
      )
    );

    await Sharing.shareAsync(
      file.uri
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};