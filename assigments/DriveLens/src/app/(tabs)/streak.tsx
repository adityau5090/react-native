import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { GlassCard } from "@/components/common/GlassCard";

import {
  Colors,
  Spacing,
} from "@/theme";

import { useStreak } from "@/hooks/useStreak";

export default function StreakScreen() {
  const { streak } =
    useStreak();

  const nextGoal =
    streak.currentStreak < 6
      ? 6
      : streak.currentStreak < 12
      ? 12
      : 30;

  const progress =
    streak.currentStreak /
    nextGoal;

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
          Streak
        </Text>

        <GlassCard>

          <Text
            style={
              styles.streakCount
            }
          >
            {
              streak.currentStreak
            }
          </Text>

          <Text
            style={
              styles.daysLabel
            }
          >
            DAYS
          </Text>

          <View
            style={
              styles.fireRow
            }
          >
            {Array.from({
              length:
                Math.min(
                  streak.currentStreak,
                  6
                ),
            }).map(
              (
                _,
                index
              ) => (
                <Text
                  key={
                    index
                  }
                  style={
                    styles.fire
                  }
                >
                  🔥
                </Text>
              )
            )}
          </View>
        </GlassCard>

        <GlassCard>
          <Text
            style={
              styles.sectionTitle
            }
          >
            Next Reward
          </Text>

          <Text
            style={
              styles.rewardTitle
            }
          >
            {nextGoal} Day
            Streak
          </Text>

          <Text
            style={
              styles.rewardXP
            }
          >
            +100 XP
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

          <Text
            style={
              styles.progressText
            }
          >
            {
              streak.currentStreak
            }{" "}
            / {nextGoal} Days
          </Text>
        </GlassCard>

        <GlassCard>
          <Text
            style={
              styles.sectionTitle
            }
          >
            Milestones
          </Text>

          <Milestone
            title="1 Day"
            unlocked={
              streak.currentStreak >=
              1
            }
          />

          <Milestone
            title="3 Days"
            unlocked={
              streak.currentStreak >=
              3
            }
          />

          <Milestone
            title="7 Days"
            unlocked={
              streak.currentStreak >=
              7
            }
          />

          <Milestone
            title="14 Days"
            unlocked={
              streak.currentStreak >=
              14
            }
          />

          <Milestone
            title="30 Days"
            unlocked={
              streak.currentStreak >=
              30
            }
          />
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

function Milestone({
  title,
  unlocked,
}: {
  title: string;
  unlocked: boolean;
}) {
  return (
    <View
      style={
        styles.milestoneRow
      }
    >
      <Text
        style={
          styles.milestoneIcon
        }
      >
        {unlocked
          ? "✅"
          : "🔒"}
      </Text>

      <Text
        style={[
          styles.milestoneText,
          !unlocked && {
            opacity: 0.5,
          },
        ]}
      >
        {title}
      </Text>
    </View>
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
      color:
        Colors.text,
      fontSize: 32,
      fontWeight: "800",
    },

    bigNumber: {
      textAlign: "center",
      fontSize: 50,
    },

    streakCount: {
      color:
        Colors.text,
      textAlign:
        "center",
      fontSize: 56,
      fontWeight: "800",
    },

    daysLabel: {
      color:
        Colors.textSecondary,
      textAlign:
        "center",
      letterSpacing: 2,
    },

    fireRow: {
      flexDirection:
        "row",
      justifyContent:
        "center",
      marginTop: 20,
      gap: 6,
    },

    fire: {
      fontSize: 22,
    },

    sectionTitle: {
      color:
        Colors.text,
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 12,
    },

    rewardTitle: {
      color:
        Colors.text,
      fontSize: 24,
      fontWeight: "700",
    },

    rewardXP: {
      color:
        Colors.primary,
      marginTop: 6,
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

    progressText: {
      color:
        Colors.textSecondary,
      marginTop: 10,
    },
    bestStreak: {
  color: Colors.primary,

  fontSize: 32,

  fontWeight: "800",
},

    milestoneRow: {
      flexDirection:
        "row",
      alignItems:
        "center",
      marginBottom: 14,
    },

    milestoneIcon: {
      fontSize: 18,
      marginRight: 12,
    },

    milestoneText: {
      color:
        Colors.text,
      fontWeight: "600",
    },
  });