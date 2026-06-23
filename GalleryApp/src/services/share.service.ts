import * as Sharing from "expo-sharing";

export async function sharePhotos(
  uris: string[]
) {
  try {
    if (uris.length === 0) return;

    const isAvailable =
      await Sharing.isAvailableAsync();

    if (!isAvailable) {
      console.log(
        "Sharing not available"
      );
      return;
    }

    // Expo Go currently supports sharing
    // a single file most reliably.

    await Sharing.shareAsync(uris[0]);
  } catch (error) {
    console.log(
      "Share Error:",
      error
    );
  }
}