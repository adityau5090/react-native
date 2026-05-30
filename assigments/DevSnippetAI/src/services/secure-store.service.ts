import * as SecureStore from "expo-secure-store";

export const KEYS = {
  PROVIDER: "AI_PROVIDER",
  OPENAI: "OPENAI_API_KEY",
  GEMINI: "GEMINI_API_KEY",
};

export const saveValue = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const getValue = async (key: string) => {
  return SecureStore.getItemAsync(key);
};