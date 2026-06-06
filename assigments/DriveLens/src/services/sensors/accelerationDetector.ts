export function detectHarshAcceleration(
  magnitude: number,
  rotationZ: number
) {
  return (
    magnitude > 6.5 &&
    Math.abs(rotationZ) < 2
  );
}