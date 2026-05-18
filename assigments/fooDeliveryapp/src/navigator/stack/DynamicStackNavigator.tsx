import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useContext, useState } from "react";
import LoginScreen from "../../screens/auth/LoginScreen";
import AuthContext from "../../context/AuthContext";
import { DynamicBottomTabNavigator } from "../tabs/DynamicBottomTabNavigator";

const Stack = createNativeStackNavigator()

const MyStack =() => {
    const { isLoggedIn } : any = useContext(AuthContext)
    return (
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            {isLoggedIn ? (
                <Stack.Screen name="MainApp" component={DynamicBottomTabNavigator} />
            ): (
                <Stack.Screen name="Login" component={LoginScreen} />
            )}
        </Stack.Navigator>
    )
}

export const DynamicStackNavigator = () => {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}