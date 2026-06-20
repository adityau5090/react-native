import { create } from "zustand";

export type ThemeMode = "dark" | "light";

interface ThemeStore {
  theme: ThemeMode;

  setTheme: (theme: ThemeMode) => void;

  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "dark",

  setTheme: (theme) => set({theme}),

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "dark" ? "light" : "dark",
    })),
}));
