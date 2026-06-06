import { useEffect } from "react";

import { useDriveStore } from "@/store/driveStore";

import { detectAggressiveSteering } from "@/services/sensors/steeringDetector";

type Props = {
  rotationZ: number;
  canTrigger: () => boolean;
  enabled: boolean;
};

export function useAggressiveSteeringDetection({rotationZ,canTrigger,enabled}: Props) {
  
  const addEvent = useDriveStore((state) => state.addEvent);

  useEffect(() => {
    if (!enabled) return;

    const detected =detectAggressiveSteering(rotationZ);

    if (detected &&canTrigger()) {

      addEvent({
        id: Date.now().toString(),
        type: "aggressive_steering",
        timestamp: Date.now(),
        severity: Math.abs(rotationZ),
      });
    }
  }, [rotationZ, canTrigger, enabled,addEvent]);
}