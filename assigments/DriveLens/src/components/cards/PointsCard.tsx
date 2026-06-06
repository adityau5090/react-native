import { Text, View, StyleSheet } from "react-native";
import { GlassCard } from "../common/GlassCard";
import {
  Colors,
  Spacing,
  Typography,
} from "@/theme";

export function PointsCard() {
  return (
    <GlassCard>
      <Text style={styles.label}>
        Total Points
      </Text>

      <Text style={styles.points}>
        12,450
      </Text>

      <Text style={styles.gain}>
        +180 Today
      </Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  label: {
    color: Colors.textSecondary,
    fontSize: Typography.caption,
  },

  points: {
    color: Colors.text,

    fontSize: 30,

    fontWeight: "700",

    marginTop: Spacing.sm,
  },

  gain: {
    color: Colors.primary,

    marginTop: Spacing.sm,

    fontWeight: "600",
  },
});