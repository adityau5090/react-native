import { useEffect } from "react";

import { useDriveStore } from "@/store/driveStore";

import { detectHarshAcceleration } from "@/services/sensors/accelerationDetector";

type Props = {
  magnitude: number;
  rotationZ: number;
  canTrigger: () => boolean;
  enabled: boolean;
};

export function useHarshAccelerationDetection({magnitude,rotationZ,canTrigger,enabled}: Props) {
  const addEvent = useDriveStore((state) => state.addEvent);

  useEffect(() => {
    if (!enabled) return;

    const detected = detectHarshAcceleration(magnitude,rotationZ);

    if (
      detected &&
      canTrigger()
    ) {

      addEvent({
        id:
          Date.now().toString(),

        type:
          "harsh_acceleration",

        timestamp:
          Date.now(),

        severity:
          magnitude,
      });
    }
  }, [
    magnitude,
    rotationZ,
    canTrigger,
    enabled,
    addEvent,
  ]);
}