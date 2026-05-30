import { initDatabase } from "@/database/db";
import { initializeStorage } from "@/services/FolderSystem.service";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {

  useEffect(() => {
    initDatabase()
    initializeStorage()
  },[])

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0f172a",
        },

        headerTintColor: "#fff",

        contentStyle: {
          backgroundColor: "#020617",
        },
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}