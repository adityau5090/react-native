export function formatRelativeDate(
  timestamp: number
) {
  const date = new Date(
    timestamp
  );

  const today =
    new Date();

  const diff =
    today.getDate() -
    date.getDate();

  if (diff === 0)
    return "Today";

  if (diff === 1)
    return "Yesterday";

  return `${diff} days ago`;
}