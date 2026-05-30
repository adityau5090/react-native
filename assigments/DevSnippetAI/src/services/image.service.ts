import * as ImagePicker from "expo-image-picker";
import { File, Directory } from "expo-file-system";
import { rootDirectory } from "./FolderSystem.service";

export const pickImage = async () => {
  const result =
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });

  if (result.canceled) {
    return null;
  }

  return result.assets[0];
};

export const saveImageLocally = async (
  imageUri: string
) => {
  try {
    const imagesFolder =
      new Directory(
        rootDirectory,
        "images"
      );

    if (!imagesFolder.exists) {
      imagesFolder.create();
    }

    const fileName =
      `image_${Date.now()}.jpg`;

    const destination =
      new File(
        imagesFolder,
        fileName
      );

    const source =
      new File(imageUri);

    source.copy(destination);

    return destination.uri;
  } catch (error) {
    console.log(error);
    return null;
  }
};