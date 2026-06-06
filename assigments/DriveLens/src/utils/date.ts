export function getToday() {
  return new Date()
    .toISOString()
    .split("T")[0];
}

export function daysBetween(date1: string,date2: string) {
  const first = new Date(date1);
  const second = new Date(date2);

  const diff = second.getTime() - first.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}