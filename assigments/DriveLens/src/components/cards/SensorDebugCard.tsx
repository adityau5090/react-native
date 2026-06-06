import {
  Text,
  StyleSheet,
} from "react-native";

import { GlassCard } from "../common/GlassCard";

import {
  Colors,
  Typography,
  Spacing,
} from "@/theme";

type Props = {
  x: number;
  y: number;
  z: number;
};

export function SensorDebugCard({
  x,
  y,
  z,
}: Props) {
  return (
    <GlassCard>
      <Text style={styles.title}>
        Accelerometer
      </Text>

      <Text style={styles.value}>
        X: {x.toFixed(2)}
      </Text>

      <Text style={styles.value}>
        Y: {y.toFixed(2)}
      </Text>

      <Text style={styles.value}>
        Z: {z.toFixed(2)}
      </Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  title: {
    color: Colors.text,

    fontWeight: "700",

    marginBottom: Spacing.md,
  },

  value: {
    color: Colors.textSecondary,

    marginBottom: Spacing.xs,
  },
});