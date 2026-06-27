import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

interface User {
  _id: string;
  name: string;
  email: string;
  expoPushToken: string;
  streak: number;
  longestStreak: number;
  avatar: string
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;

  setAuth: (
    user: User,
    token: string
  ) => Promise<void>;

  logout: () => Promise<void>;

  loadAuth: () => Promise<void>;
}

export const useAuthStore =
  create<AuthState>((set) => ({
    user: null,
    token: null,
    loading: true,

    setAuth: async (user, token) => {
      await SecureStore.setItemAsync(
        "token",
        token
      );

      await SecureStore.setItemAsync(
        "user",
        JSON.stringify(user)
      );

      set({
        user,
        token,
      });
    },

    logout: async () => {
      await SecureStore.deleteItemAsync(
        "token"
      );

      await SecureStore.deleteItemAsync(
        "user"
      );

      set({
        user: null,
        token: null,
      });
    },

    loadAuth: async () => {
      try {
        const token =
          await SecureStore.getItemAsync(
            "token"
          );

        const user =
          await SecureStore.getItemAsync(
            "user"
          );

        set({
          token,
          user: user
            ? JSON.parse(user)
            : null,
          loading: false,
        });
      } catch {
        set({
          loading: false,
        });
      }
    },
  }));