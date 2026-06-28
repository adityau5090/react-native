import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function SplashScreen() {
  const translateY = useSharedValue(0);
  const glowScale = useSharedValue(1);

  useEffect(() => {
    // Floating logo animation
    translateY.value = withRepeat(
      withSequence(
        withTiming(-12, {
          duration: 1500,
        }),
        withTiming(12, {
          duration: 1500,
        })
      ),
      -1,
      true
    );

    // Glow pulse animation
    glowScale.value = withRepeat(
      withSequence(
        withTiming(1.2, {
          duration: 1200,
        }),
        withTiming(1, {
          duration: 1200,
        })
      ),
      -1,
      true
    );
  }, []);

  const floatingLogoStyle =
    useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY:
              translateY.value,
          },
        ],
      };
    });

  const pulseGlowStyle =
    useAnimatedStyle(() => {
      return {
        transform: [
          {
            scale: glowScale.value,
          },
        ],
      };
    });

  return (
    <LinearGradient
      colors={[
        "#0A0A0A",
        "#151515",
        "#0A0A0A",
      ]}
      style={styles.container}
    >
      {/* Glow */}
      <Animated.View>
        <Animated.View
          style={[
            styles.glow,
            pulseGlowStyle,
          ]}
        />
      </Animated.View>

      {/* Logo */}
      <Animated.View
        entering={FadeInDown.duration(
          800
        )}
      >
        <Animated.View
          style={floatingLogoStyle}
        >
          <Image
            source={require("@/assets/images/Logo.png")}
            style={styles.logo}
          />
        </Animated.View>
      </Animated.View>

      {/* App Name */}
      <Animated.Text
        entering={FadeInUp.delay(
          300
        ).duration(700)}
        style={styles.title}
      >
        ZenStreak
      </Animated.Text>

      {/* Subtitle */}
      <Animated.Text
        entering={FadeInUp.delay(
          700
        ).duration(700)}
        style={styles.subtitle}
      >
        Build Better Habits
      </Animated.Text>

      {/* Quote */}
      <Animated.Text
        entering={FadeInUp.delay(
          1000
        ).duration(700)}
        style={styles.quote}
      >
        "Consistency compounds"
      </Animated.Text>

      {/* Loader Dots */}
      <View style={styles.loader}>
        <Animated.View
          entering={FadeInUp.delay(
            1200
          )}
          style={styles.dot}
        />

        <Animated.View
          entering={FadeInUp.delay(
            1400
          )}
          style={styles.dot}
        />

        <Animated.View
          entering={FadeInUp.delay(
            1600
          )}
          style={styles.dot}
        />
      </View>
    </LinearGradient>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:
        "center",
      alignItems: "center",
    },

    glow: {
      position: "absolute",

      width: 260,
      height: 260,

      borderRadius: 130,

      backgroundColor:
        "#FF7A00",

      opacity: 0.18,
    },

    logo: {
      width: 170,
      height: 170,
      resizeMode: "contain",
    },

    title: {
      marginTop: 30,

      color: "#fff",

      fontSize: 42,

      fontWeight: "800",

      letterSpacing: 1,
    },

    subtitle: {
      marginTop: 12,

      color:
        "rgba(255,255,255,0.85)",

      fontSize: 18,

      fontWeight: "500",
    },

    quote: {
      marginTop: 20,

      color:
        "rgba(255,255,255,0.5)",

      fontSize: 14,

      fontStyle: "italic",
    },

    loader: {
      position: "absolute",

      bottom: 90,

      flexDirection: "row",

      gap: 10,
    },

    dot: {
      width: 10,
      height: 10,

      borderRadius: 5,

      backgroundColor:
        "#FF7A00",
    },
  });