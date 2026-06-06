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

import { useProfileStats } from "@/hooks/useProfileStats";
import { useLevel } from "@/hooks/useLevel";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const stats =
    useProfileStats();

  const level =
    useLevel();

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={
          styles.content
        }
      >
        <GlassCard>
  <View style={styles.profileHeader}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>
        🚗
      </Text>
    </View>

    <Text style={styles.driverName}>
      Safe Driver
    </Text>

    <Text style={styles.driverRank}>
      Level {level.level}
    </Text>

    <Text style={styles.xpText}>
      {level.xp} XP
    </Text>

    <View style={styles.track}>
      <View
        style={[
          styles.fill,
          {
            width: `${
              level.progress *
              100
            }%`,
          },
        ]}
      />
    </View>
  </View>
</GlassCard>

        <GlassCard>
  <Text style={styles.sectionTitle}>
    Current Streak
  </Text>

  <Text style={styles.streakValue}>
    🔥 {stats.streak} Days
  </Text>

  <View style={styles.streakRow}>
    {Array.from({
      length: Math.min(
        stats.streak,
        7
      ),
    }).map((_, index) => (
      <Text
        key={index}
        style={styles.flag}
      >
        <Ionicons name="flag" size={20} />
      </Text>
    ))}
  </View>
</GlassCard>

        <View style={styles.grid}>
          <StatCard
            label="Drives"
            value={
              stats.totalDrives
            }
          />

          <StatCard
            label="Best"
            value={
              stats.bestScore
            }
          />

          <StatCard
            label="Avg"
            value={
              stats.averageScore
            }
          />

          <StatCard
            label="Streak"
            value={
              stats.streak
            }
          />
        </View>

        <GlassCard>
          <Text
            style={
              styles.sectionTitle
            }
          >
            Lifetime Stats
          </Text>

          <InfoRow
            label="Distance"
            value={`${stats.totalDistance.toFixed(
              1
            )} km`}
          />

          <InfoRow
            label="XP Earned"
            value={stats.xp}
          />

          <InfoRow
            label="Achievements"
            value={
              stats.achievementsUnlocked
            }
          />
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({
  label,
  value,
}: any) {
  return (
    <GlassCard>
      <Text
        style={
          styles.statValue
        }
      >
        {value}
      </Text>

      <Text
        style={
          styles.statLabel
        }
      >
        {label}
      </Text>
    </GlassCard>
  );
}

function InfoRow({
  label,
  value,
}: any) {
  return (
    <View
      style={styles.infoRow}
    >
      <Text
        style={
          styles.infoLabel
        }
      >
        {label}
      </Text>

      <Text
        style={
          styles.infoValue
        }
      >
        {value}
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
    profileHeader: {
  alignItems: "center",
},

avatar: {
  width: 90,

  height: 90,

  borderRadius: 45,

  backgroundColor:
    "rgba(22,242,197,0.12)",

  justifyContent: "center",

  alignItems: "center",

  marginBottom: 16,
},

avatarText: {
  fontSize: 40,
},

driverName: {
  color: Colors.text,

  fontSize: 24,

  fontWeight: "800",
},

driverRank: {
  color: Colors.primary,

  marginTop: 6,

  fontWeight: "700",
},

xpText: {
  color:
    Colors.textSecondary,

  marginTop: 8,
},

streakValue: {
  color: Colors.text,

  fontSize: 32,

  fontWeight: "800",
},

streakRow: {
  flexDirection: "row",

  marginTop: 16,

  gap: 6,
},

flag: {
  color: "#22C55E",
  fontSize: 20
},
    content: {
      padding:
        Spacing.md,

      gap:
        Spacing.md,
    },

    name: {
      color: Colors.text,

      fontSize: 28,

      fontWeight: "800",
    },

    level: {
      color:
        Colors.primary,

      marginTop: 8,

      fontSize: 18,
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

    xp: {
      color:
        Colors.textSecondary,

      marginTop: 10,
    },

    grid: {
      flexDirection: "row",

      flexWrap: "wrap",

      gap: 12,
    },

    statValue: {
      color: Colors.text,

      fontSize: 28,

      fontWeight: "700",
    },

    statLabel: {
      color:
        Colors.textSecondary,
    },

    sectionTitle: {
      color: Colors.text,

      fontSize: 20,

      fontWeight: "700",

      marginBottom: 16,
    },

    infoRow: {
      flexDirection: "row",

      justifyContent:
        "space-between",

      marginBottom: 14,
    },

    infoLabel: {
      color:
        Colors.textSecondary,
    },

    infoValue: {
      color: Colors.text,

      fontWeight: "700",
    },
  });