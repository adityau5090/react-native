import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { GlassCard } from "@/components/common/GlassCard";

import {
  Colors,
  Spacing,
} from "@/theme";

type Props = {
  totalDrives: number;
  totalXP: number;
  averageScore: number;
  bestScore: number;
};

export function HistoryAnalyticsCard({
  totalDrives,
  totalXP,
  averageScore,
  bestScore,
}: Props) {
  return (
    <GlassCard>
      <Text style={styles.title}>
        Your Driving Stats
      </Text>

      <View style={styles.grid}>
        <Stat
          icon="🚗"
          label="Drives"
          value={totalDrives}
        />

        <Stat
          icon="⭐"
          label="Avg Score"
          value={averageScore}
        />

        <Stat
          icon="🔥"
          label="XP"
          value={totalXP}
        />

        <Stat
          icon="🏆"
          label="Best"
          value={bestScore}
        />
      </View>
    </GlassCard>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: number;
}) {
  return (
    <View style={styles.stat}>
      <Text style={styles.icon}>
        {icon}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.label}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: Spacing.lg,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:
      "space-between",
  },

  stat: {
    width: "48%",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },

  icon: {
    fontSize: 24,
    marginBottom: 8,
  },

  value: {
    color: Colors.text,
    fontSize: 26,
    fontWeight: "800",
  },

  label: {
    color:
      Colors.textSecondary,
    marginTop: 4,
  },
});