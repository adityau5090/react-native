import { useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuthStore } from "@/store/auth.store";

export default function RootScreen() {
  const {
    user,
    loading,
    loadAuth,
  } = useAuthStore();

  useEffect(() => {
    loadAuth();
  }, []);

  useEffect(() => {
    checkAppFlow();
  }, [loading, user]);

  const checkAppFlow = async () => {
    if (loading) return;

    const onboardingCompleted =
      await AsyncStorage.getItem(
        "onboardingCompleted"
      );

    // First launch
    if (
      onboardingCompleted !== "true"
    ) {
      router.replace("/onboarding");
      return;
    }

    // User logged in
    if (user) {
      router.replace("/(tabs)");
    }

    // User not logged in
    else {
      router.replace("/auth/login");
    }
  };

  return null;
}