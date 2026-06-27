
import {StatusBar} from "expo-status-bar";
import { initDB } from "@/db/database";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { setupNotificationListeners } from "@/lib/notifications/handler";
import "@/lib/google"

export default function RootLayout() {
  useEffect(() => {
    initDB()
    setupNotificationListeners()
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false}}/>
    </>
  )
}
