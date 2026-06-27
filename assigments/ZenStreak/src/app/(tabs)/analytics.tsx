import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";

import Screen from "@/components/ui/Screen";
import { useTheme } from "@/theme";
import { StatCard } from "@/components/analytics/StatCard";
import {StreakHeatmap} from "@/components/analytics/StreakHeatMap";
import {WeeklyProgress} from "@/components/analytics/WeeklyProgress";
import {Achievements} from "@/components/analytics/Achievement";

export default function AnalyticsScreen() {
  const colors = useTheme();

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 60}}
      >
        {/* Stats */}

        <View style={styles.statsGrid}>
          <StatCard
            emoji="🔥"
            value={12}
            label="Current"
          />

          <StatCard
            emoji="🏆"
            value={30}
            label="Longest"
          />

          <StatCard
            emoji="⭐"
            value={8}
            label="Habits"
          />

          <StatCard
            emoji="✅"
            value={82}
            label="Complete %"
          />
        </View>

        {/* Heatmap */}

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
              styles.title,
              { color: colors.text },
            ]}
          >
            Consistency
          </Text>

          <StreakHeatmap />
        </View>

        {/* Weekly */}

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
              styles.title,
              { color: colors.text },
            ]}
          >
            Weekly Progress
          </Text>

          <WeeklyProgress />
        </View>

        {/* Achievements */}

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
              styles.title,
              { color: colors.text },
            ]}
          >
            Achievements
          </Text>

          <Achievements />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 5,
  },

  section: {
    marginTop: 25,
    borderRadius: 24,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
});