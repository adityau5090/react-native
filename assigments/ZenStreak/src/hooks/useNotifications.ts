import { useEffect, useState } from "react";

import {
  getNotificationPermissionStatus,
  requestNotificationPermission,
} from "@/lib/notifications/permissions";

export function useNotifications() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  async function checkPermission() {
    const status = await getNotificationPermissionStatus();

    setGranted(status === "granted");
  }

  async function requestPermission() {
    const granted = await requestNotificationPermission();

    setGranted(granted);

    return granted;
  }

  return {
    granted,
    requestPermission,
  };
}