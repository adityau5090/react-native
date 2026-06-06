export function getLevelInfo(totalXP: number) {
  const level = Math.floor(totalXP / 500) + 1;

  const currentLevelXP = totalXP % 500;

  return {
    level,
    currentLevelXP,
    requiredXP: 500,
  };
}