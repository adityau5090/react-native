export const DEVICE_MOVEMENT_THRESHOLD = 4;

export function detectExcessiveMovement(magnitude: number) {
  return (magnitude > DEVICE_MOVEMENT_THRESHOLD
  );
}