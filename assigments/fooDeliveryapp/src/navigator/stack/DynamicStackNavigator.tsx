import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useContext, useState } from "react";
import LoginScreen from "../../screens/auth/LoginScreen";
import AuthContext from "../../context/AuthContext";
import { DynamicBottomTabNavigator } from "../tabs/DynamicBottomTabNavigator";
import OnBoardingScreen from "../../screens/auth/OnBoardingScreen";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator()

const MyStack =() => {
    const { isLoggedIn } : any = useContext(AuthContext)
    return (
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
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
    <>   
        <NavigationContainer>
            <StatusBar backgroundColor="green" barStyle='light-content' />
            <MyStack />
        </NavigationContainer>
        <Toast />
    </>    
    )
}