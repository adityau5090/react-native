import { useXP } from "./useXP";

export function useLevel() {
  const { xp } = useXP();

  const level =
    Math.floor(xp / 500) + 1;

  const currentLevelXP =
    xp % 500;

  const progress =
    currentLevelXP / 500;

  return {
    level,
    progress,
    xp,
    nextLevelXP:
      level * 500,
  };
}