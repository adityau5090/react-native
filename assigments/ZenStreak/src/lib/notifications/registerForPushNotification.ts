import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync() {
  let token = null;

  if (!Device.isDevice) {
    alert("Push notifications require a physical device.");
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } =
      await Notifications.requestPermissionsAsync();

    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Permission not granted.");
    return null;
  }

  token = (await Notifications.getExpoPushTokenAsync({
        projectId: "f43cddbd-35b0-46b8-a78b-be3604e737c2",
  })
  ).data;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(
      "default",
      {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      }
    );
  }

  return token;
}