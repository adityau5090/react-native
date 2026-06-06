import { Text, View, StyleSheet } from "react-native";
import { GlassCard } from "../common/GlassCard";

import {
  Colors,
  Typography,
  Spacing,
} from "@/theme";

type Props = {
  label: string;
  count: number;
};

export function EventCounterCard({
  label,
  count,
}: Props) {
  return (
    <GlassCard>
      <Text style={styles.count}>
        {count}
      </Text>

      <Text style={styles.label}>
        {label}
      </Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  count: {
    color: Colors.text,

    fontSize: 28,

    fontWeight: "700",
  },

  label: {
    marginTop: Spacing.xs,

    color: Colors.textSecondary,
  },
});