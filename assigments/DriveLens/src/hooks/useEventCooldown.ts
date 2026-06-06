import { useRef } from "react";

export function useEventCooldown(cooldownMs = 2000) {
  const lastTriggered = useRef(0);

  const canTrigger = () => {
    const now = Date.now();

    if (now - lastTriggered.current < cooldownMs
    ) {
      return false;
    }

    lastTriggered.current = now;

    return true;
  };

  return {
    canTrigger,
  };
}