import { Ionicons } from "@expo/vector-icons";
import { Tabs } from 'expo-router';
import { StatusBar } from "react-native";

export default function TabLayout() {
  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#111" />
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: 'Camera',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="cog" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cameraflashTorch"
        options={{
          title: 'FlashFip&Zoom',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="flash" color={color} />,
        }}
      />
      <Tabs.Screen
        name="audio"
        options={{
          title: 'Audio',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="musical-notes" color={color} />,
        }}
      />
      
    </Tabs>
    </>
  );
}
