import { useEffect } from "react";
import { useDriveStore } from "@/store/driveStore";
import { detectExcessiveMovement } from "@/services/sensors/eventDetector";

type Props = {
    magnitude: number;
    canTrigger: () => boolean;
    enabled: boolean
};

export function useDeviceMovementDetection({magnitude, canTrigger, enabled}: Props) {
    const addEvent = useDriveStore((state) => state.addEvent);
    // console.log("Magnitude :", magnitude)
    
  

  useEffect(() => {
    if(!enabled) return;
    const detected = detectExcessiveMovement(magnitude);
    
    if (detected && canTrigger()) {
        // console.log("device movement detected")
      addEvent({id:Date.now().toString(), type:"device_movement", timestamp: Date.now(), severity: magnitude });
    }
  }, [magnitude, canTrigger, addEvent, enabled]);
}