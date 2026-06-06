import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import SplashScreen from "./splash";

export default function StartupScreen() {
  useEffect(() => {
    checkAppState();
  }, []);

  async function checkAppState() {
    const completed =
      await AsyncStorage.getItem(
        "onboarding_complete"
      );

    setTimeout(() => {
      if (completed) {
        router.replace("/(tabs)");
      } else {
        router.replace(
          "/onboarding/welcome"
        );
      }
    }, 2000);
  }

  return <SplashScreen />;
}