import {View,Text,StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {Ionicons,MaterialCommunityIcons} from "@expo/vector-icons";
import { GradientButton } from "@/components/buttons/GradientButton";
import { requestPermissions } from "@/services/permissions/requestPermission";

export default function CompleteScreen() {
  async function finishOnboarding() {
    const permissions = await requestPermissions();

if (!permissions.location) {
  return;
}

await AsyncStorage.setItem(
  "onboarding_complete",
  "true"
);

router.replace("/(tabs)");
  }

  return (
    <LinearGradient
      colors={[
        "#000000",
        "#071A15",
        "#0A2A22",
      ]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.rewardContainer}>
          <View style={styles.glowLarge} />

          <View style={styles.glowSmall} />

          <Ionicons
            name="trophy"
            size={90}
            color="#16F2C5"
          />
        </View>

        <Text style={styles.title}>
          Drive Safe,
          Earn XP.
        </Text>

        <Text style={styles.description}>
          Every safe drive earns XP.
          {"\n"}
          Build streaks.
          {"\n"}
          Improve your driving habits.
        </Text>

        <View style={styles.cards}>
          <RewardCard
            icon="star"
            title="+100 XP"
            subtitle="Safe Drive"
          />

          <RewardCard
            icon="fire"
            title="7 Day Streak"
            subtitle="Stay Consistent"
          />

          <RewardCard
            icon="shield-check"
            title="Safety Score"
            subtitle="Track Progress"
          />
        </View>

        <View style={styles.pagination}>
          <View style={styles.dot} />

          <View style={styles.dot} />

          <View
            style={[
              styles.dot,
              styles.activeDot,
            ]}
          />
        </View>
      </View>

      <GradientButton
        title="Start Driving"
        onPress={finishOnboarding}
      />
    </LinearGradient>
  );
}

function RewardCard({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.rewardCard}>
      <MaterialCommunityIcons
        name={icon as any}
        size={24}
        color="#16F2C5"
      />

      <View>
        <Text style={styles.rewardTitle}>
          {title}
        </Text>

        <Text
          style={
            styles.rewardSubtitle
          }
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  rewardContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 190,

    marginBottom: 40,
  },

  glowLarge: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 120,
    backgroundColor: "rgba(22,242,197,0.08)",
  },

  glowSmall: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 75,
    backgroundColor: "rgba(22,242,197,0.15)",
  },

  title: {
    color: "#FFF",
    fontSize: 35,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 32,
  },

  description: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    textAlign: "center",
    marginTop: 15,
    lineHeight: 24,
    marginBottom: 15,
  },

  cards: {
    gap: 14,
  },

  rewardCard: {
    flexDirection: "row",

    alignItems: "center",

    gap: 14,

    padding: 16,

    borderRadius: 20,

    backgroundColor:
      "rgba(255,255,255,0.05)",

    borderWidth: 1,

    borderColor:
      "rgba(22,242,197,0.15)",
  },

  rewardTitle: {
    color: "#FFF",

    fontSize: 16,

    fontWeight: "700",
  },

  rewardSubtitle: {
    color:
      "rgba(255,255,255,0.6)",

    marginTop: 4,

    fontSize: 13,
  },

  pagination: {
    flexDirection: "row",

    justifyContent: "center",

    marginTop: 30,

    gap: 10,
  },

  dot: {
    width: 8,

    height: 8,

    borderRadius: 4,

    backgroundColor:
      "rgba(255,255,255,0.2)",
  },

  activeDot: {
    width: 24,

    backgroundColor:
      "#16F2C5",
  },
});