import {
  View,
  StyleSheet,
} from "react-native";

import {
  LinearGradient,
} from "expo-linear-gradient";

import Animated, {
  FadeIn,
  ZoomIn,
} from "react-native-reanimated";

import { useEffect } from "react";

import { DriveLensLogo } from "@/components/branding/DriveLensLogo";

export default function SplashScreen() {

  return (
    <LinearGradient
      colors={[
        "#000000",
        "#071A15",
        "#0ED9B0",
      ]}
      start={{
        x: 0,
        y: 0,
      }}
      end={{
        x: 1,
        y: 1,
      }}
      style={styles.container}
    >
      <Animated.View
        entering={
          FadeIn.duration(800)
        }
      >
        <Animated.View
          entering={
            ZoomIn.duration(1000)
          }
        >
          <DriveLensLogo />
        </Animated.View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent:
      "center",

    alignItems:
      "center",
  },
});