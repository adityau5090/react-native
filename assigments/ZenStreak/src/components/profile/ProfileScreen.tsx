import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

import Screen from "@/components/ui/Screen";
import { useTheme } from "@/theme";
import { useAuthStore } from "@/store/auth.store";
import { MenuItem } from "@/components/profile/MenuItem";
import { StatCard } from "./StatCard"

export default function ProfileScreen() {
  const colors = useTheme();

  const user = useAuthStore(
    (state) => state.user
  );

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 60}}
      >
        {/* HEADER */}

        <View style={styles.header}>
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
            value={user?.streak || 0}
            emoji="🔥"
          />

          <StatCard
            title="Longest"
            value={
              user?.longestStreak || 0
            }
            emoji="🏆"
          />

          <StatCard
            title="Habits"
            value={8}
            emoji="⭐"
          />

          <StatCard
            title="Today"
            value={5}
            emoji="✅"
          />
        </View>

        {/* ACHIEVEMENTS */}

        <View
          style={[
            styles.section,
            {
              backgroundColor:
                colors.card,
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

          <Text style={{ fontSize: 36 }}>
            🔥 🥉 🥈 🏅
          </Text>
        </View>

        {/* MENU */}

        <View
          style={[
            styles.section,
            {
              backgroundColor:
                colors.card,
            },
          ]}
        >
          <MenuItem
            icon="notifications-outline"
            title="Notifications"
          />

          <MenuItem
            icon="moon-outline"
            title="Appearance"
          />

          <MenuItem
            icon="calendar-outline"
            title="Calendar"
          />

          <MenuItem
            icon="information-circle-outline"
            title="About"
          />

          <MenuItem
            icon="log-out-outline"
            title="Logout"
          />
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

});