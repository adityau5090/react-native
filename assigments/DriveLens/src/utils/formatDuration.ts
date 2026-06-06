export function formatDuration(
  durationMs: number
) {
  const totalSeconds =
    Math.floor(
      durationMs / 1000
    );

  const minutes =
    Math.floor(
      totalSeconds / 60
    );

  const seconds =
    totalSeconds % 60;

  return `${minutes}m ${seconds}s`;
}