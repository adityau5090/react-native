import { Image } from "expo-image";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, useAnimatedReaction } from "react-native-reanimated";

interface Props {
  uri: string;

}

const ZoomableImage = ({uri}: Props) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  
  

  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = event.scale;
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withSpring(1);

        translateX.value = withSpring(0)
        translateY.value = withSpring(0)
      }
    });

    const pan = Gesture.Pan()
        .onUpdate((event) => {
            if (scale.value > 1) {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
            }
    });

  const animatedStyle =
    useAnimatedStyle(() => ({
      transform: [
        {
          translateX: translateX.value,
        },
        {
            translateY: translateY.value,
        },
        {
            scale: scale.value,
        }
      ],
    }));

    const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
        if (scale.value > 1) {
        scale.value = withSpring(1);

        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        } else {
        scale.value = withSpring(2);
        }
    });

 6

    const composedGesture = Gesture.Simultaneous(pinch, pan, doubleTap);

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        style={[
          {
            flex: 1,
          },
          animatedStyle,
        ]}
      >
        <Image
          source={{ uri }}
          contentFit="contain"
          style={{
            flex: 1,
          }}
        />
      </Animated.View>
    </GestureDetector>
  );
}

export { ZoomableImage }