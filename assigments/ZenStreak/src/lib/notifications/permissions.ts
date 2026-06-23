import * as Notifications from "expo-notifications";

export async function getNotificationPermissionStatus() {
  const settings = await Notifications.getPermissionsAsync();

  return settings.status;
}

export async function requestNotificationPermission() {
  const settings = await Notifications.getPermissionsAsync();

  if (settings.granted) {
    return true;
  }

  const request = await Notifications.requestPermissionsAsync();
  return request.granted;
}