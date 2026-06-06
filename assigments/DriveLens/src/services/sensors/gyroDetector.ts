export function detectSharpTurn(
  rotationZ: number
) {
  return (
    Math.abs(rotationZ) > 6
  );
}

export function getTurnSeverity(
  z: number
) {
  const value =
    Math.abs(z);

  if (value > 12)
    return "high";

  if (value > 8)
    return "medium";

  return "low";
}