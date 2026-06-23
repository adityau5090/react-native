import { useColorScheme } from "react-native";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

import { useThemeStore } from "@/store/useThemeStore";

export const useTheme = () => {
  const systemTheme = useColorScheme();
  // console.log(systemTheme)
  const mode = useThemeStore((state) => state.mode);

  const activeTheme = mode === "system" ? systemTheme : mode;

  return activeTheme === "dark" ? darkTheme : lightTheme;
};