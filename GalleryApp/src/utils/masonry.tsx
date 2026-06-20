export function getMasonryHeight(
  width: number,
  height: number
) {
  const ratio = height / width;

  const baseWidth = 170;

  const calculatedHeight = baseWidth * ratio;

  return Math.max(
    150,
    Math.min(calculatedHeight, 400)
  );
}