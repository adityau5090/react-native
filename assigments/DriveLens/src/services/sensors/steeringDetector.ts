export function detectAggressiveSteering(
  rotationZ: number
) {
  return (
    Math.abs(rotationZ) > 12
  );
}