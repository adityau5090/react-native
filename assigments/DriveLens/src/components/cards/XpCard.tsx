import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { GlassCard } from "../common/GlassCard";

import {
  Colors,
  Spacing,
} from "@/theme";

import { getLevelInfo } from "@/services/xp/levelEngine";

type Props = {
  xp: number;
};

export function XPCard({
  xp,
}: Props) {
  const levelInfo =
    getLevelInfo(xp);

  const progress =
    (levelInfo.currentLevelXP /
      levelInfo.requiredXP) *
    100;

  return (
    <GlassCard>
      <Text style={styles.title}>
        ⭐ Driver Level
      </Text>

      <Text style={styles.level}>
        Level {levelInfo.level}
      </Text>

      <Text style={styles.xp}>
        {xp} XP
      </Text>

      <View
        style={
          styles.progressTrack
        }
      >
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>

      <Text
        style={styles.remaining}
      >
        {
          levelInfo.currentLevelXP
        }
        /
        {
          levelInfo.requiredXP
        } XP
      </Text>
    </GlassCard>
  );
}

const styles =
  StyleSheet.create({
    title: {
      color: Colors.text,

      fontWeight: "700",

      fontSize: 18,
    },

    level: {
      color: Colors.text,

      fontSize: 36,

      fontWeight: "800",

      marginTop: 12,
    },

    xp: {
      color:
        Colors.textSecondary,

      marginBottom: 16,
    },

    progressTrack: {
      height: 10,

      borderRadius: 999,

      backgroundColor:
        Colors.surface,

      overflow: "hidden",
    },

    progressFill: {
      height: "100%",

      backgroundColor:
        Colors.primary,
    },

    remaining: {
      marginTop: 10,

      color:
        Colors.textSecondary,
    },
  });