export const Colors = {
  dark: {
    background: "#120506",
    card: "#1D0A0D",
    surface: "#2B1015",

    primary: "#B3294B",
    primaryLight: "#D33A63",

    text: "#FFFFFF",
    subText: "#C8A7AE",

    border: "#3B141C",

    success: "#16A34A",
    warning: "#F59E0B",
    error: "#EF4444",

    glass: "rgba(255,255,255,0.08)",
    overlay: "rgba(0,0,0,0.4)",
  },

  light: {
    background: "#F7F0E8",
    card: "#FFF9F3",
    surface: "#F1E6DB",

    primary: "#9B1739",
    primaryLight: "#B3294B",

    text: "#2A1618",
    subText: "#7A5B5E",

    border: "#E3D5C7",

    success: "#16A34A",
    warning: "#F59E0B",
    error: "#DC2626",

    glass: "rgba(255,255,255,0.6)",
    overlay: "rgba(0,0,0,0.1)",
  },
};

export type ThemeType = keyof typeof Colors;