import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { initDatabase } from "@/database/database";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    initDatabase()
  }, [])
  
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  )
}
