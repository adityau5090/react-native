import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
    <StatusBar style="dark" />
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Local Notifications" }} />
      <Tabs.Screen name="push" options={{ title: "Push Notifications" }} />
    </Tabs>
    </>
  )
}
