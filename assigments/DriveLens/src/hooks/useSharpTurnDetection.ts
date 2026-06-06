import { useEffect } from "react";

import { useDriveStore } from "@/store/driveStore";

import { detectSharpTurn } from "@/services/sensors/gyroDetector";

type Props = {
  rotationZ: number;
  canTrigger: () => boolean;
  enabled: boolean;
};

export function useSharpTurnDetection({rotationZ,canTrigger,enabled}: Props) {
  const addEvent = useDriveStore((state) => state.addEvent);

  useEffect(() => {
    if (!enabled) return;

    const detected = detectSharpTurn(rotationZ);

    if (detected && canTrigger()) {
      addEvent({
        id: Date.now().toString(),
        type: "sharp_turn",
        timestamp: Date.now(),
        severity:Math.abs(rotationZ),
      });

    }
  }, [rotationZ,enabled,canTrigger,addEvent]);
}