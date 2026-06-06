import AsyncStorage from "@react-native-async-storage/async-storage";

import { DriveSession } from "@/types/drive";

const KEY = "drive_history";

export async function saveSession(
  session: DriveSession
) {
  const sessions =
    await getSessions();

  const updated = [
    session,
    ...sessions,
  ];

  await AsyncStorage.setItem(
    KEY,
    JSON.stringify(updated)
  );
}

export async function getSessions(): Promise<DriveSession[]> {
  const value =
    await AsyncStorage.getItem(KEY);

  if (!value) {
    return [];
  }

  return JSON.parse(value);
}

export async function deleteSession(sessionId: string) {
  const sessions = await getSessions();

  const updated = sessions.filter((session) => session.id !== sessionId);

  await AsyncStorage.setItem(
    KEY,
    JSON.stringify(updated)
  );
}

export async function clearHistory() {
  await AsyncStorage.removeItem(
    KEY
  );
}
export async function logout() {
  await AsyncStorage.removeItem(
    "onboarding_complete"
  );
}