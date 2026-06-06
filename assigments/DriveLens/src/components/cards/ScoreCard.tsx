import { GlassCard } from "@/components/common/GlassCard";
import { ScoreRing } from "@/components/score/ScoreRing";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "@/theme";
import {Info} from "lucide-react-native"
import { useDriveScore } from "@/hooks/useDriveScore";
import { useSafetyRating } from "@/hooks/useSafetyRating";

export function ScoreCard() {
  const score = useDriveScore()
  const rating = useSafetyRating()
  // console.log(rating)
  return (
    <GlassCard>
  <View style={styles.header}>
  <Text style={styles.title}>
    Safety Score
  </Text>

  <Info size={18} color={Colors.textSecondary} />
</View>

  <ScoreRing score={score} />

  <View style={styles.footer}>
  <View
    style={[
      styles.badge,
      {
        borderColor:
          rating.color,
      },
    ]}
  >
    <Text
      style={[
        styles.badgeText,
        {
          color:
            rating.color,
        },
      ]}
    >
      {rating.label}
    </Text>
  </View>
{/* 
  <Text style={styles.trend}>
    Live Drive Score
  </Text> */}
  <Text style={styles.trend}>
      ↗ Improved by 2 points today
  </Text>
</View>
</GlassCard>
  );
}

const styles = StyleSheet.create({
  header: {
  flexDirection: "row",

  justifyContent: "space-between",

  alignItems: "center",

  marginBottom: Spacing.md,
},  
  title: {
    color: Colors.text,

    fontSize: Typography.title,

    fontWeight: "600",

    // marginBottom: Spacing.md,
  },

  footer: {
    marginTop: Spacing.md,

    alignItems: "center",

    gap: Spacing.sm,
  },

  badge: {
    backgroundColor: "rgba(0,240,181,0.12)",

    borderWidth: 1,

    borderColor: "rgba(0,240,181,0.3)",

    paddingHorizontal: Spacing.md,

    paddingVertical: Spacing.sm,

    borderRadius: Radius.full,
  },

  badgeText: {
    color: Colors.primary,

    fontWeight: "600",

    fontSize: Typography.caption,
  },

  trend: {
    color: Colors.success,

    fontSize: Typography.caption,

    fontWeight: "500",
  },
});