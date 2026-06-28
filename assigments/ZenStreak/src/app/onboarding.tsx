import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Pressable,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const slides = [
  {
    title: "Never Break The Chain",
    subtitle:
      "Get smart reminders and stay consistent every single day.",
    image: require("@/assets/images/onboarding1.png"),
  },

  {
    title: "Track Your Progress",
    subtitle:
      "Visualize your streaks with beautiful analytics and insights.",
    image: require("@/assets/images/onboarding2.png"),
  },

  {
    title: "Build Better Habits",
    subtitle:
      "Create habits that stick and transform your daily routine.",
    image: require("@/assets/images/onboarding3.png"),
  },
];

export default function OnboardingScreen() {
  const scrollRef = useRef<ScrollView>(null);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const onScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const slide = Math.round(
      event.nativeEvent.contentOffset.x / width
    );

    setCurrentIndex(slide);
  };

  const handleNext = async () => {
    if (
      currentIndex < slides.length - 1
    ) {
      scrollRef.current?.scrollTo({
        x: width * (currentIndex + 1),
        animated: true,
      });
    } else {
      await AsyncStorage.setItem(
        "onboardingCompleted",
        "true"
      );

      router.replace("/auth/login");
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem(
      "onboardingCompleted",
      "true"
    );

    router.replace("/auth/login");
  };

  return (
    <View style={styles.container}>

      <Pressable
        style={styles.skipButton}
        onPress={handleSkip}
      >
        <Text style={styles.skipText}>
          Skip
        </Text>
      </Pressable>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
      >
        {slides.map((slide, index) => (
          <View
            key={index}
            style={styles.slide}
          >
            <Image
              source={slide.image}
              style={styles.image}
            />

            <Text style={styles.title}>
              {slide.title}
            </Text>

            <Text
              style={styles.subtitle}
            >
              {slide.subtitle}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,

              currentIndex === index &&
                styles.activeDot,
            ]}
          />
        ))}
      </View>


      <Pressable
        style={styles.button}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>
          {currentIndex ===
          slides.length - 1
            ? "Get Started"
            : "Next"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
  },

  skipButton: {
    position: "absolute",
    top: 65,
    right: 25,
    zIndex: 10,
  },

  skipText: {
    color: "#999",
    fontSize: 16,
    fontWeight: "600",
  },

  slide: {
    width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  image: {
    width: width,
    height: width * 1.45,
    resizeMode: "contain",
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 10,
  },

  subtitle: {
    color: "#999",
    fontSize: 17,
    textAlign: "center",
    marginTop: 18,
    lineHeight: 28,
    paddingHorizontal: 20,
  },

  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
    gap: 8,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#444",
  },

  activeDot: {
    width: 30,
    backgroundColor: "#FF7A00",
  },

  button: {
    marginHorizontal: 20,
    marginBottom: 45,
    backgroundColor: "#FF7A00",
    paddingVertical: 18,
    borderRadius: 22,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});