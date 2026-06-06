import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import {
  Colors,
  Typography,
  Spacing,
} from "@/theme";

type ScoreRingProps = {
  score: number;
};

export function ScoreRing({
  score,
}: ScoreRingProps) {
  const radius = 90;
  const strokeWidth = 12;

  const circumference = 2 * Math.PI * radius;

  const progress = score / 100;

  const strokeDashoffset =
    circumference -
    circumference * progress;

  return (
    <View style={styles.container}>
      <Svg width={220} height={220}>
        <Circle
          cx="110"
          cy="110"
          r={radius}
          stroke={Colors.surface}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        <Circle
          cx="110"
          cy="110"
          r={radius}
          stroke={Colors.primary}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin="110,110"
        />
      </Svg>

      <View style={styles.centerContent}>
        <Text style={styles.score}>
          {score}
        </Text>

        <Text style={styles.label}>
          Safety Score
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  centerContent: {
    position: "absolute",
    alignItems: "center",
  },

  score: {
    color: Colors.text,
    fontSize: Typography.h1,
    fontWeight: "700",
  },

  label: {
    marginTop: Spacing.xs,
    color: Colors.textSecondary,
    fontSize: Typography.caption,
  },
});