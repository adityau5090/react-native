import { Colors } from "@/theme/color";
import { useThemeStore } from "@/store/theme.store";

export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);

  return Colors[theme];
};