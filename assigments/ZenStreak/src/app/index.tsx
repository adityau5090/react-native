import { useEffect } from "react";
import { router } from "expo-router";

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
    if (loading) return;

    if (user) {
        console.log(user);
      router.replace("/(tabs)");
    } else {
      router.replace("/auth/login");
    }
  }, [loading, user]);

  return null;
}