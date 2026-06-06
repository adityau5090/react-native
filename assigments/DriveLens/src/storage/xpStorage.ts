import AsyncStorage from "@react-native-async-storage/async-storage";

const XP_KEY = "user_xp";

export async function getXP() {
  const value =
    await AsyncStorage.getItem(
      XP_KEY
    );

  return value
    ? Number(value)
    : 0;
}

export async function saveXP(
  xp: number
) {
  await AsyncStorage.setItem(
    XP_KEY,
    xp.toString()
  );
}