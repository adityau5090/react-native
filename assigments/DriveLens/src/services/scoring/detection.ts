export function detectHarshBrake(
  y: number
) {
  return y < -2.5;
}

export function magnitude(x:number, y:number, z:number){
    return Math.sqrt(
  x * x +
  y * y +
  z * z
);
}
