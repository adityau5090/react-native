import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";

import { LinearGradient } from "expo-linear-gradient";

import { Ionicons } from "@expo/vector-icons";

import { GradientButton } from "@/components/buttons/GradientButton";

export default function WelcomeScreen() {
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
        <View style={styles.illustration}>
          <View style={styles.glowLarge} />

          <View style={styles.glowSmall} />

          <Ionicons
            name="car"
            size={90}
            color="#f2e716"
          />
        </View>

        <Text style={styles.title}>
          See Every{"\n"}
          Drive Differently
        </Text>

        <Text style={styles.description}>
          Track trips.
          {"\n"}
          Measure safety.
          {"\n"}
          Improve every drive.
        </Text>

        <View style={styles.pagination}>
          <View
            style={[
              styles.dot,
              styles.activeDot,
            ]}
          />

          <View style={styles.dot} />

          <View style={styles.dot} />
        </View>
      </View>

      <GradientButton
        title="Start Journey"
        onPress={() =>
          router.push(
            "/onboarding/permissions"
          )
        }
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 24,

    justifyContent:
      "space-between",
  },

  content: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
  },

  illustration: {
    width: 240,

    height: 240,

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 60,
  },

  glowLarge: {
    position: "absolute",

    width: 240,

    height: 240,

    borderRadius: 120,

    backgroundColor:
      "rgba(22,242,197,0.08)",
  },

  glowSmall: {
    position: "absolute",

    width: 150,

    height: 150,

    borderRadius: 75,

    backgroundColor:
      "rgba(22,242,197,0.15)",
  },

  title: {
    color: "#FFFFFF",

    fontSize: 48,

    fontWeight: "900",

    textAlign: "center",

    lineHeight: 54,
  },

  description: {
    marginTop: 24,

    color:
      "rgba(255,255,255,0.75)",

    fontSize: 18,

    lineHeight: 30,

    textAlign: "center",
  },

  pagination: {
    flexDirection: "row",

    marginTop: 40,

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