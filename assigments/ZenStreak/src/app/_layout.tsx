import { StatusBar } from "expo-status-bar";
import { initDB } from "@/db/database";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { setupNotificationListeners } from "@/lib/notifications/handler";
import "@/lib/google";
import { useThemeStore } from "@/store/useThemeStore";
import { useColorScheme } from "react-native";
import SplashScreen from "./splash";

export default function RootLayout() {
  const [showSplash, setShowSplash] =
    useState(true);

  const mode = useThemeStore(
    (state) => state.mode
  );

  const systemTheme = useColorScheme();

  useEffect(() => {
    initDB();
    setupNotificationListeners();

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar
        style={
          mode === "system"
            ? systemTheme === "dark"
              ? "light"
              : "dark"
            : mode === "dark"
            ? "light"
            : "dark"
        }
      />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}