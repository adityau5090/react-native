import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../../screens/mainScreens/Drawer/ProfileScreen";
import MyOrderScreen from "../../screens/mainScreens/Drawer/MyOrderScreen";
import SettingScreen from "../../screens/mainScreens/Drawer/SettingScreen";
import HelpScreen from "../../screens/mainScreens/Drawer/HelpScreen";
import LogoutScreen from "../../screens/mainScreens/Drawer/LogoutScreen";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawer from "./CustomDrawer";

const Drawer = createDrawerNavigator()

const MyDrawer = () => {
    return (
        <Drawer.Navigator
  drawerContent={(props) => <CustomDrawer {...props} />}
  initialRouteName="Profile"
  screenOptions={{
    headerStyle: {
      backgroundColor: "green",
    },
    headerTintColor: "#fff",

    drawerStyle: {
      backgroundColor: "#111", 
    },

    drawerActiveTintColor: "#16a34a",
    drawerInactiveTintColor: "#fff",

    drawerItemStyle: {
      marginVertical: 6,
      borderRadius: 10,
    },
  }}
>
            <Drawer.Screen name="Profile" component={ProfileScreen}
            options={{
                drawerIcon: ({ color, size }) => (
                    <Ionicons name="person-outline" size={size} color={color} />
                )
            }}
            />
            <Drawer.Screen name="My Order" component={MyOrderScreen}
            options={{
                drawerIcon: ({ color, size }) => (
                    <Ionicons name="receipt-outline" size={size} color={color} />
                )
            }}
            />
            <Drawer.Screen name="Setting" component={SettingScreen} 
            options={{
                drawerIcon: ({ color, size }) => (
                    <Ionicons name="settings-outline" size={size} color={color} />
                )
            }}
            />
            <Drawer.Screen name="Help" component={HelpScreen} 
            options={{
                drawerIcon: ({ color, size }) => (
                    <Ionicons name="help-circle-outline" size={size} color={color} />
                )
            }}
            />
            {/* <Drawer.Screen name="Logout" component={LogoutScreen} 
            options={{
                drawerIcon: ({ color, size }) => (
                    <Ionicons name="log-out-outline" size={size} color={color} />
                )
            }}
            /> */}
        </Drawer.Navigator>
    )
}

export const DynamicProfileDrawerNavigator = () => {
    return <MyDrawer />
}