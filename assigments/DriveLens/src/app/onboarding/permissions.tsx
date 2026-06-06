import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";

import { LinearGradient } from "expo-linear-gradient";

import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { GradientButton } from "@/components/buttons/GradientButton";

export default function PermissionsScreen() {
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
        <View style={styles.phoneContainer}>
          <View style={styles.glowLarge} />

          <View style={styles.glowSmall} />

          <Ionicons
            name="phone-portrait"
            size={80}
            color="#16F2C5"
          />
        </View>

        <Text style={styles.title}>
          Your Phone{"\n"}
          Sees Everything
        </Text>

        <Text style={styles.description}>
          DriveLens uses your phone's
          sensors to understand how
          you drive.
        </Text>

        <View style={styles.sensorContainer}>
          <SensorItem
            icon="navigate-outline"
            title="GPS"
            description="Track speed and distance"
          />

          <SensorItem
            icon="speedometer-outline"
            title="Gyroscope"
            description="Detect turns and steering"
          />

          <SensorItem
            icon="pulse-outline"
            title="Accelerometer"
            description="Detect movement and handling"
          />
        </View>

        <View style={styles.pagination}>
          <View style={styles.dot} />

          <View
            style={[
              styles.dot,
              styles.activeDot,
            ]}
          />

          <View style={styles.dot} />
        </View>
      </View>

      <GradientButton
        title="Continue"
        onPress={() =>
          router.push(
            "/onboarding/complete"
          )
        }
      />
    </LinearGradient>
  );
}

function SensorItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.sensorCard}>
      <Ionicons
        name={icon as any}
        size={24}
        color="#16F2C5"
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.sensorTitle}>
          {title}
        </Text>

        <Text
          style={
            styles.sensorDescription
          }
        >
          {description}
        </Text>
      </View>
    </View>
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
  },

  phoneContainer: {
    alignItems: "center",

    justifyContent: "center",

    height: 220,

    marginBottom: 20,
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
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 28,
  },

  description: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 17,
    textAlign: "center",
    marginTop: 15,
    marginBottom: 15,
    lineHeight: 22,
  },

  sensorContainer: {
    gap: 14,
  },

  sensorCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(22,242,197,0.15)",
  },

  sensorTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  sensorDescription: {
    color: "rgba(255,255,255,0.6)",
    marginTop: 4,
    fontSize: 13,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
    gap: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  activeDot: {
    width: 24,
    backgroundColor: "#16F2C5",
  },
});