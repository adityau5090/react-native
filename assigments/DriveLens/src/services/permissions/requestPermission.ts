import * as Location from "expo-location";

export async function requestPermissions() {
  const location =
    await Location.requestForegroundPermissionsAsync();

  return {
    location:
      location.status === "granted",
  };
}