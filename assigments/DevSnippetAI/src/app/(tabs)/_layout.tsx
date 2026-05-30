import { Tabs } from "expo-router";
import {
  Ionicons,
} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
  return (
    <SafeAreaView>

      <StatusBar
        style="light"
      />
      <Tabs
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            position: "absolute",

            left: 20,

            right: 20,

            bottom: 10,

            height: 72,

            borderRadius: 30,

            backgroundColor: "#D4B0B0",

            borderTopWidth: 0,
            marginHorizontal: 5,
          },

          tabBarActiveTintColor: "#6B4C4C",
          tabBarInactiveTintColor: "#A07C7C",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",

            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="home"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",

            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="heart"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="files"
          options={{
            title: "Files",

            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="folder"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",

            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="settings"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  )
}