import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import OrderScreen from "../../screens/mainScreens/OrderScreen";
import SearchScreen from "../../screens/mainScreens/SearchScreen";
import { DynamicHomeStackNavigator } from "../stack/DynamicHomeStackNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { DynamicProfileDrawerNavigator } from "../drawer/DynamicProfileDrawerNavigator";
import { useContext } from "react";
import CartContext from "../../context/CartContext";

const Tab = createBottomTabNavigator()

const MyTab = () => {

    const { cartItems, order }: any = useContext(CartContext)
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: '#111',
                    borderTopWidth: 0,
                    elevation: 10,
                },
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: '#888',
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 5,
                },
                animation: "shift",
                transitionSpec: {
                    animation: "timing",
                    config: {
                        duration: 200,
                    },
                },

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'Orders') {
                        iconName = focused ? 'receipt' : 'receipt-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    return (
                        <Ionicons
                            name={iconName as any}
                            size={focused ? 24 : 22}
                            color={color}
                        />
                    );
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={DynamicHomeStackNavigator}
                options={({ route }) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
                    return {
                        tabBarStyle: {
                            display: routeName === "Home" ? "flex" : "none",
                            backgroundColor: "#111"
                        },
                    };
                }}
            />

            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{ tabBarLabel: 'Search' }}
            />

            <Tab.Screen
                name="Orders"
                component={OrderScreen}
                options={{
                    tabBarLabel: 'Orders',
                    tabBarBadge: order?.length > 0 ? order.length : undefined
                }}
            />

            <Tab.Screen
                name="Profile"
                component={DynamicProfileDrawerNavigator}
                options={{ tabBarLabel: 'Profile' }}
            />

        </Tab.Navigator>
    )

}

export const DynamicBottomTabNavigator = () => {
    return <MyTab />
}