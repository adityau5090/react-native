import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import DetailScreen from "../../screens/DetailScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator()

function MyTab() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#111',
                    borderTopWidth: 0,
                    height: 65,
                    elevation: 10,
                },

                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: '#888',

                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 5,
                },

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Details') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return (
                        <Ionicons
                            name={iconName}
                            size={focused ? 24 : 22}
                            color={color}
                        />
                    );
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ tabBarLabel: 'Home' }}
            />

            <Tab.Screen
                name="Details"
                component={DetailScreen}
                options={{ tabBarLabel: 'Details' }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ tabBarLabel: 'Profile', tabBarBadge: 3}}
            />
        </Tab.Navigator>
    )
}

export default function DynamicTabNavigator() {
    return (
        <NavigationContainer>
            <MyTab />
        </NavigationContainer>
    )
}