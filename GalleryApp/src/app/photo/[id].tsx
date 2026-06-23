import { View,Pressable } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { usePhotoViewerStore } from "@/store/photoViewer.store";
import { ZoomableImage } from "@/components/viewer/ZoomableImage";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function PhotoViewer() {
  const { currentPhoto } = usePhotoViewerStore();

  const translateY = useSharedValue(0);
const scale = useSharedValue(1);

  if (!currentPhoto) {return null;}

  const dismissGesture = Gesture.Pan()
  .onUpdate((event) => {
    translateY.value = event.translationY;

    const progress = Math.min(
      Math.abs(event.translationY) / 500,
      1
    );

    scale.value = 1 - progress * 0.2;
  })
  .onEnd((event) => {
    const shouldClose =
      Math.abs(event.translationY) > 150;

    if (shouldClose) {
      console.log("DISMISS");
  return;
    }

    translateY.value = withSpring(0);
    scale.value = withSpring(1);
  });

  const animatedStyle = useAnimatedStyle(() => ({
  transform: [
    {
      translateY: translateY.value,
    },
    {
      scale: scale.value,
    },
  ],
}));

  return (
    <GestureDetector gesture={dismissGesture}>
  <Animated.View
    style={[
      {
        flex: 1,
        backgroundColor: "#000",
      },
      animatedStyle,
    ]}
  >
      <ZoomableImage uri={currentPhoto.uri} />

      <Pressable onPress={() => {router.back();}}
        style={{ position: "absolute", top: 60, left: 20 }} 
      >
        <Ionicons
          name="close"
          size={32}
          color="white"
        />
      </Pressable>
      </Animated.View>
</GestureDetector>
  );
}