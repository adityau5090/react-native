import { useEffect } from "react";

import { useDriveStore } from "@/store/driveStore";

import { detectPhoneHandling } from "@/services/sensors/phoneHandlingDetector";

type Props = {
  magnitude: number;
  rotationZ: number;
  canTrigger: () => boolean;
  enabled: boolean;
};

export function usePhoneHandlingDetection({magnitude,rotationZ,canTrigger,enabled}: Props) {
  const addEvent = useDriveStore((state) => state.addEvent);

  useEffect(() => {
    if (!enabled) return;

    // console.log(magnitude, rotationZ)
    const detected = detectPhoneHandling(magnitude,rotationZ);
    // console.log("Detected : ", detected)
    const allowed = canTrigger()
    // console.log("Allowed :", allowed)
    if (
      detected &&
      canTrigger()
    ) {

      // console.log("Phone handling detceted")

      addEvent({
        id:
          Date.now().toString(),

        type:
          "phone_handling",

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