import { Tabs } from "expo-router";

import { BlurView } from "expo-blur";
import { useTheme } from "@/theme";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "@/components/ui/AppHeader";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/store/auth.store";

export default function TabLayout() {
    const colors = useTheme();
    const user = useAuthStore((state) => state.user);

    const isAdmin = user?.email === "ayus135os@gmail.com";
    // console.log(isAdmin)

    return (
        <>
            <StatusBar style="dark" />
            <Tabs
                screenOptions={{
                    header: () => <AppHeader />,
                    tabBarShowLabel: false,

                    tabBarItemStyle: {
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: 15, // <-- adjust this value
                    },
                    tabBarIconStyle: {
                        marginTop: 0,
                    },
                    tabBarBackground: () => (
                        <BlurView
                            intensity={50}
                            tint="default"
                            style={{ flex: 1, borderRadius: 40 }}
                        />
                    ),

                    tabBarStyle: {
                        position: "absolute",

                        left: 20,
                        right: 20,
                        bottom: 20,
                        height: 75,
                        borderRadius: 40,
                        borderTopWidth: 0,
                        backgroundColor: colors.card,
                        overflow: "hidden",
                        elevation: 0,
                    },
                }}
            >

                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 26,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: focused ? colors.primary : "transparent",
                                }}
                            >
                                <Ionicons
                                    name={focused ? "home" : "home-outline"}
                                    size={24}
                                    color={focused ? "#fff" : "#999"}
                                />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="analytics"
                    options={{
                        title: "Analytics",
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 26,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: focused ? colors.primary : "transparent",
                                }}
                            >
                                <Ionicons
                                    name={focused ? "stats-chart" : "stats-chart-outline"}
                                    size={24}
                                    color={focused ? "#fff" : "#999"}
                                />
                            </View>
                        ),
                    }}
                />

                <Tabs.Screen
                    name="notifications"
                    options={{
                        title: "Notifications",
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 26,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: focused ? colors.primary : "transparent",
                                }}
                            >
                                <Ionicons
                                    name={focused ? "notifications" : "notifications-outline"}
                                    size={24}
                                    color={focused ? "#fff" : "#999"}
                                />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ focused }) => (
                            <View
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 26,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: focused ? colors.primary : "transparent",
                                }}
                            >
                                <Ionicons
                                    name={focused ? "person" : "person-outline"}
                                    size={24}
                                    color={focused ? "#fff" : "#999"}
                                />
                            </View>
                        ),
                    }}
                />
                {isAdmin && (
                    <Tabs.Screen
                        name="admin"
                        options={{
                            title: "Admin",
                            tabBarIcon: ({ color }) => (
                                <Ionicons
                                    name="shield"
                                    size={24}
                                    color={color}
                                />
                            ),
                        }}
                    />
                )}
            </Tabs>
        </>
    );
}