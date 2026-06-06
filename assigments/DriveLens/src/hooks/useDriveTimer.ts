import { useEffect, useState } from "react";

export function useDriveTimer(
  isRunning: boolean
) {
  const [seconds, setSeconds] =
    useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () =>
      clearInterval(interval);
  }, [isRunning]);

  return seconds;
}