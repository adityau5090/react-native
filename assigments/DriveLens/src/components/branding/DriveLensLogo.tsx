import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/theme";

export function DriveLensLogo() {
  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <View style={styles.glow} />
          <Ionicons
  name="navigate"
  size={48}
  color="#16F2C5"
/>

        <View style={styles.lensRing} />
      </View>

      <Text style={styles.title}>
        DriveLens
      </Text>

      <Text style={styles.tagline}>
        Drive Better. See Every Drive.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  logoCircle: {
    width: 120,
    height: 120,

    borderRadius: 60,

    backgroundColor:
  "rgba(14,217,176,0.12)",

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 24,
  },

  lensRing: {
    position: "absolute",

    width: 140,

    height: 140,

    borderRadius: 70,

    borderWidth: 2,

    borderColor:
  "rgba(14,217,176,0.35)",
  },

  title: {
    color: "#FFFFFF",

    fontSize: 38,

    fontWeight: "900",

    letterSpacing: 1,
  },

  tagline: {
    marginTop: 8,

    color: "#A1A1AA",

    fontSize: 15,
  },
  glow: {
  position: "absolute",

  width: 220,

  height: 220,

  borderRadius: 110,

  backgroundColor:
    "rgba(14,217,176,0.15)",

  transform: [
    { scale: 1.2 },
  ],
},
});