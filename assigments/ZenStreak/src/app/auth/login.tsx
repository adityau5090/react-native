import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Screen from "@/components/ui/Screen";
import { useTheme } from "@/theme";
import { useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { registerForPushNotificationsAsync } from "@/lib/notifications/registerForPushNotification";
import { useAuthStore } from "@/store/auth.store";

export default function LoginScreen() {
  const colors = useTheme();
  const setAuth = useAuthStore((state) => state.setAuth);


  const handleGoogleSignIn = async () => {
    try {
      console.log("Starting Google Sign In");


      await GoogleSignin.signOut();

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const response = await GoogleSignin.signIn()
      // console.log("Response by google :",response);
      const user = response?.data?.user;
      if (!user) {
        console.error("Failed to get user data from Google Sign In");
        return;
      }
      // console.log("User :", user)
      const expoPushToken = await registerForPushNotificationsAsync();

      const res = await fetch("https://zenstreak-backend.onrender.com/api/auth/google-login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: user.name,
            email: user.email,
            avatar: user.photo,
            googleId: user.id,
            expoPushToken,
          }),
        }
      );

      const data = await res.json();
      
      console.log("Backend Response:", data);

      await setAuth(data.user, data.token)

      router.replace("/(tabs)")

    } catch (error) {
      console.log(
        "Google Sign In Error:",
        error
      );
    }
  };
  return (
    <Screen>
      <View style={styles.container}>
        {/* Logo Section */}

        <View style={styles.hero}>
          <Text style={styles.logo}>🔥</Text>

          <Text
            style={[
              styles.title,
              { color: colors.text },
            ]}
          >
            ZenStreak
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: colors.textSecondary },
            ]}
          >
            Build habits.{"\n"}
            Transform your life.
          </Text>
        </View>

        {/* Features */}

        <View style={styles.features}>
          <Feature
            icon="checkmark-circle"
            text="Track Daily Habits"
            color={colors.text}
          />

          <Feature
            icon="flame"
            text="Maintain Streaks"
            color={colors.text}
          />

          <Feature
            icon="notifications"
            text="Smart Reminders"
            color={colors.text}
          />
        </View>

        {/* Google Button */}

        <Pressable
          style={[
            styles.googleButton,
            {
              backgroundColor: colors.primary,
            },
          ]}
          // disabled={!request}
          onPress={handleGoogleSignIn}
        >
          <Ionicons
            name="logo-google"
            size={24}
            color="#fff"
          />

          <Text style={styles.googleText}>
            Continue with Google
          </Text>
        </Pressable>

        <Text
          style={[
            styles.footer,
            { color: colors.textSecondary },
          ]}
        >
          By continuing you agree to our Terms &
          Privacy Policy.
        </Text>
      </View>
    </Screen>
  );
}

function Feature({
  icon,
  text,
  color,
}: {
  icon: any;
  text: string;
  color: string;
}) {
  return (
    <View style={styles.featureRow}>
      <Ionicons
        name={icon}
        size={24}
        color="#ff8c42"
      />

      <Text
        style={[
          styles.featureText,
          { color },
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 60,
  },

  hero: {
    alignItems: "center",
    marginTop: 50,
  },

  logo: {
    fontSize: 70,
  },

  title: {
    marginTop: 15,
    fontSize: 42,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 18,
    lineHeight: 28,
  },

  features: {
    gap: 24,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  featureText: {
    fontSize: 18,
    fontWeight: "600",
  },

  googleButton: {
    height: 62,
    borderRadius: 24,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    gap: 12,
  },

  googleText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  footer: {
    textAlign: "center",
    fontSize: 13,
    lineHeight: 20,
  },
});