import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface Props {
  children: React.ReactNode;
  onPress: () => void;
  focused: boolean;
}

const AnimatedPressable =
  Animated.createAnimatedComponent(
    Pressable
  );

export default function TabButton({
  children,
  onPress,
  focused,
}: Props) {
  const scale = useSharedValue(1);

  const animatedStyle =
    useAnimatedStyle(() => ({
      transform: [
        {
          scale: scale.value,
        },
      ],
    }));

  return (
    <AnimatedPressable
      onPressIn={() => {
        scale.value =
          withSpring(0.9);
      }}
      onPressOut={() => {
        scale.value =
          withSpring(1);
      }}
      onPress={onPress}
      style={[
        {
          width: 56,
          height: 56,

          borderRadius: 28,

          justifyContent:
            "center",

          alignItems:
            "center",
        },
        animatedStyle,
      ]}
    >
      {children}
    </AnimatedPressable>
  );
}