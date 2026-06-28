import {View,Text,Image,ScrollView,StyleSheet,Alert,Pressable} from "react-native";
import Screen from "@/components/ui/Screen";
import { useTheme } from "@/theme";
import { useAuthStore } from "@/store/auth.store";
import { MenuItem } from "@/components/profile/MenuItem";
import { StatCard } from "./StatCard"
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useHabitStore } from "@/store/habit.store";

export default function ProfileScreen() {
  
  const colors = useTheme();
  const logout = useAuthStore(state => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await GoogleSignin.signOut();

              await logout();

              router.replace("/auth/login");
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  const habits = useHabitStore(
  (state) => state.habits
);

const totalHabits = habits.length;

const completedToday = habits.filter(
  (habit) => habit.completedToday
).length;

const currentStreak = Math.max(
  ...habits.map((h) => h.streak || 0),
  0
);

const longestStreak = Math.max(
  ...habits.map(
    (h) => h.longestStreak || 0
  ),
  0
);
  
  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 60}}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
  <Image
    source={require("@/assets/images/Logo.png")}
    style={styles.logo}
  />

  <Text
    style={[
      styles.appName,
      { color: colors.text },
    ]}
  >
    ZenStreak
  </Text>
</View>
          <Image
            source={{
              uri: user?.avatar,
            }}
            style={styles.avatar}
          />

          <Text
            style={[
              styles.name,
              { color: colors.text },
            ]}
          >
            {user?.name}
          </Text>

          <Text
            style={{
              color: colors.textSecondary,
            }}
          >
            {user?.email}
          </Text>
        </View>

        {/* STATS */}

        <View style={styles.statsContainer}>
  <StatCard
    title="Current"
    value={currentStreak}
    emoji="🔥"
  />

  <StatCard
    title="Longest"
    value={longestStreak}
    emoji="🏆"
  />

  <StatCard
    title="Habits"
    value={totalHabits}
    emoji="⭐"
  />

  <StatCard
    title="Today"
    value={completedToday}
    emoji="✅"
  />
</View>

            <Pressable
  style={[
    styles.logoutButton,
    {
      backgroundColor: "#ef4444",
    },
  ]}
  onPress={handleLogout}
>
  <Ionicons
    name="log-out-outline"
    size={22}
    color="#fff"
  />

  <Text style={styles.logoutText}>
    Logout
  </Text>
</Pressable>
        {/* ACHIEVEMENTS */}

       <View
  style={[
    styles.section,
    {
      backgroundColor: colors.card,
    },
  ]}
>
  <Text
    style={[
      styles.sectionTitle,
      { color: colors.text },
    ]}
  >
    Achievements
  </Text>

  <Text style={[styles.achievement, {color: colors.text}]}>
    {currentStreak >= 1
      ? "🔥 First Streak Unlocked"
      : "🔒 Complete your first habit"}
  </Text>

  <Text style={[styles.achievement, {color: colors.text}]}>
    {currentStreak >= 7
      ? "🏅 7 Day Warrior"
      : "🔒 Reach 7 day streak"}
  </Text>

  <Text style={[styles.achievement, {color: colors.text}]}>
    {currentStreak >= 30
      ? "🏆 Habit Master"
      : "🔒 Reach 30 day streak"}
  </Text>
</View>

<View
  style={[
    styles.section,
    {
      backgroundColor: colors.card,
    },
  ]}
>
  <Text
    style={[
      styles.sectionTitle,
      { color: colors.text },
    ]}
  >
    About ZenStreak
  </Text>

  <Text
    style={{
      color: colors.textSecondary,
      lineHeight: 24,
    }}
  >
    Build better habits, stay consistent,
    and transform small actions into
    lifelong success.
  </Text>
</View>

      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginTop: 30,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  name: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 15,
  },

logoutText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "700",
},
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 40,
  },

  section: {
    marginTop: 25,
    borderRadius: 24,
    padding: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },

  logoContainer: {
  alignItems: "center",
  marginBottom: 10
},

logo: {
  width: 100,
  height: 100,
  resizeMode: "contain",
},

appName: {
  fontSize: 28,
  fontWeight: "800",
  marginTop: 10,
},

achievement: {
  fontSize: 16,
  marginBottom: 12,
},

logoutButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,

  paddingVertical: 16,
  borderRadius: 18,

  marginTop: 30,
  marginBottom: 10,
},

});