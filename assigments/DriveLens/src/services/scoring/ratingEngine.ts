export function getSafetyRating(
  score: number
) {
  if (score >= 90) {
    return {
      label: "Excellent",
      color: "#00F0B5",
    };
  }

  if (score >= 75) {
    return {
      label: "Good",
      color: "#22a2c5",
    };
  }

  if (score >= 60) {
    return {
      label: "Fair",
      color: "#F59E0B",
    };
  }

  return {
    label: "Poor",
    color: "#EF4444",
  };
}