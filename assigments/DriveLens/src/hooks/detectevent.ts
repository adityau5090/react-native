const THRESHOLDS = {
  BRAKE:  -1.5,   // g-force
  ACCEL:   1.5,   // g-force
  TURN:    1.2,   // rad/s
  ORIENT:  45,    // degrees
};

export function detectHarshBrake({ x }: any) {
  return x < THRESHOLDS.BRAKE;
}

export function detectHarshAccel({ x }: any) {
  return x > THRESHOLDS.ACCEL;
}

export function detectSharpTurn({ z }: any) {
  return Math.abs(z) > THRESHOLDS.TURN;
}

export function detectPhoneHandling(
  prevOrient: any , currOrient: any
) {
    const delta = Math.abs(
    currOrient - prevOrient
  );
  return delta > THRESHOLDS.ORIENT;
}