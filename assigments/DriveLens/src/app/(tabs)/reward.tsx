import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  Colors,
  Spacing,
} from "@/theme";

import { GlassCard } from "@/components/common/GlassCard";

import { useXP } from "@/hooks/useXP";
import { useAchievements } from "@/hooks/useAchievements";

export default function RewardScreen() {
  const { xp } = useXP();
  const achievements = useAchievements()
  const level =
    Math.floor(xp / 500) + 1;

  const progress =
    (xp % 500) / 500;

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={
          styles.content
        }
      >
        <Text style={styles.title}>
          Rewards
        </Text>

        <GlassCard>
          <Text style={styles.level}>
            Level {level}
          </Text>

          <Text style={styles.xp}>
            {xp} XP
          </Text>

          <View
            style={
              styles.track
            }
          >
            <View
              style={[
                styles.fill,
                {
                  width: `${
                    progress *
                    100
                  }%`,
                },
              ]}
            />
          </View>
        </GlassCard>

        <Text
          style={
            styles.sectionTitle
          }
        >
          Achievements
        </Text>
          <Text
  style={
    styles.sectionTitle
  }
>
  Achievements
</Text>

{achievements.map(
  (
    achievement
  ) => (
    <AchievementCard
      key={
        achievement.id
      }
      title={
        achievement.title
      }
      description={
        achievement.description
      }
      unlocked={
        achievement.unlocked
      }
    />
  )
)}
      </ScrollView>
    </SafeAreaView>
  );
}

function AchievementCard({
  title,
  description,
  unlocked,
}: {
  title: string;

  description: string;

  unlocked: boolean;
}) {
  return (
    <GlassCard>
      <View
        style={styles.row}
      >
        <Text
          style={
            styles.emoji
          }
        >
          {unlocked
            ? "🏆"
            : "🔒"}
        </Text>

        <View>
          <Text
            style={[
              styles.achievement,
              !unlocked && {
                opacity: 0.5,
              },
            ]}
          >
            {title}
          </Text>

          <Text
            style={
              styles.description
            }
          >
            {description}
          </Text>
        </View>
      </View>
    </GlassCard>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor:
        Colors.background,
    },

    content: {
      padding:
        Spacing.md,

      gap:
        Spacing.md,
    },

    title: {
      color: Colors.text,

      fontSize: 32,

      fontWeight: "800",
    },

    level: {
      color: Colors.text,

      fontSize: 24,

      fontWeight: "700",
    },

    xp: {
      color:
        Colors.textSecondary,

      marginTop: 8,
    },

    description: {
  color:
    Colors.textSecondary,

  marginTop: 4,

  fontSize: 12,
},

    track: {
      height: 10,

      backgroundColor:
        "#222",

      borderRadius: 999,

      marginTop: 16,
    },

    fill: {
      height: "100%",

      backgroundColor:
        Colors.primary,

      borderRadius: 999,
    },

    sectionTitle: {
      color: Colors.text,

      fontSize: 20,

      fontWeight: "700",

      marginTop: 12,
    },

    row: {
      flexDirection: "row",

      alignItems:
        "center",

      gap: 12,
    },

    emoji: {
      fontSize: 24,
    },

    achievement: {
      color: Colors.text,

      fontSize: 16,

      fontWeight: "600",
    },
  });