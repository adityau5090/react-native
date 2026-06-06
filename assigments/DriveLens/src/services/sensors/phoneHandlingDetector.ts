export function detectPhoneHandling(magnitude: number,rotationZ: number
) {
  return (
    magnitude > 4 &&
    Math.abs(rotationZ) > 3
  );
}