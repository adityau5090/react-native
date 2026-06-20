import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { useTheme } from "@/hooks/useTheme";

interface Props {
  height: number;
}

export default function PhotoSkeleton({
  height,
}: Props) {
  const colors = useTheme();

  const translateX = useSharedValue(-250);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(250, {
        duration: 1400,
      }),
      -1,
      false
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={{
        width: "100%",
        height,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "#dbd5d5dc",
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            width: 80,
            height: "100%",
            backgroundColor: "rgba(202, 181, 181, 0.33)",
          },
          shimmerStyle,
        ]}
      />
    </View>
  );
}