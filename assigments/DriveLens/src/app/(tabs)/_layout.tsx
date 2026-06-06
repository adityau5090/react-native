import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopWidth: 0,
          height: 70,
          paddingTop: 10,
        },

        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
      }}
    >
        <Tabs.Screen
        name="history"
        options={{title: "History",
          tabBarIcon: ({color,size}) => (
            <Ionicons
              name="time"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="reward"
        options={{title: "Rewards",
          tabBarIcon: ({color,size}) => (
            <Ionicons
              name="trophy"
              size={size}
              color={color}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="index"
        options={{ title: "Home",
          tabBarIcon: ({color,size,}) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />


      <Tabs.Screen
        name="streak"
        options={{title: "Streak",
          tabBarIcon: ({color,size}) => (
            <Ionicons
              name="flame"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({color,size}) => (
            <Ionicons
              name="person"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}