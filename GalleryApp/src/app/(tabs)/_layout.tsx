import { Tabs } from "expo-router";
import { BlurView }  from "expo-blur"
import Ionicons  from "@expo/vector-icons/Ionicons"
import { useTheme } from "@/hooks/useTheme";

export default function TabLayout() {
    const colors = useTheme();

    return (
        <Tabs 
            screenOptions={{ 
                headerShown: false, 
                tabBarActiveTintColor: colors.primary, 
                tabBarInactiveTintColor: colors.subText,

                tabBarStyle: {
                    position: "absolute",
                    bottom: 10,
                    left: 16,
                    right: 16,
                    height: 75,
                    borderTopWidth: 0,
                    backgroundColor: "transparent",
                    elevation: 0,
                },
                tabBarBackground: () => (
                    <BlurView
                        intensity={30}
                        tint="dark"
                        style={{
                        flex: 1,
                        borderRadius: 30,
                        overflow: "hidden",
                        }}
                    />
                ),
                
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Gallery",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons 
                            name="image-outline"
                            size={size}
                            color={color}
                        />
                    )
                }} 
            />   
            <Tabs.Screen
                name="folders"
                options={{
                    title: "Folders",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons 
                            name="folder-outline"
                            size={size}
                            color={color}
                        />
                    )
                }} 
            />   
            <Tabs.Screen
                name="private"
                options={{
                    title: "Vault",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons 
                            name="lock-closed-outline"
                            size={size}
                            color={color}
                        />
                    )
                }} 
            />   
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons 
                            name="settings-outline"
                            size={size}
                            color={color}
                        />
                    )
                }} 
            />   
        </Tabs>
    )
}