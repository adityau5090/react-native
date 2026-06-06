import { Colors } from "./colors";

export const Gradients = {
  primary: [
    Colors.primaryDark,
    Colors.primary,
  ] as const,

  success: [
    "#16A34A",
    "#22C55E",
  ] as const,

  danger: [
    "#DC2626",
    "#EF4444",
  ] as const,
};