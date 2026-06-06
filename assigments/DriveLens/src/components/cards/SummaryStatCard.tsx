import { Text, View, StyleSheet } from "react-native";

import { GlassCard } from "../common/GlassCard";

import {
  Colors,
  Typography,
  Spacing,
} from "@/theme";

type Props = {
  label: string;
  value: string | number;
};

export function SummaryStatCard({label,value}: Props) {
  return (
    <GlassCard>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  label: {
    color: Colors.textSecondary,
  },

  value: {
    marginTop: Spacing.sm,

    color: Colors.text,

    fontSize: Typography.h3,

    fontWeight: "700",
  },
});