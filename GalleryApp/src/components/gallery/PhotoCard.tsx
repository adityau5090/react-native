import { memo, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withTiming } from "react-native-reanimated";

interface PhotoCardProps {
  id: string;
  uri: string;
  height: number;
  selected?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}   

const PhotoCard = ({id, uri, height, selected, onPress, onLongPress}: PhotoCardProps) => {
    // console.log("Selected: ", selected)
    const scale = useSharedValue(1);

    useEffect(() => {
        scale.value = withTiming(selected ? 0.92 : 1, {duration: 200})
    }, [selected])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
            {
                scale: scale.value,
            },
            ],
        };
    });

    return (
        <Animated.View style={animatedStyle}>
            <Pressable onPress={onPress} style={{marginBottom: 10}} onLongPress={onLongPress}>
            <Image
                source={{uri}}
                contentFit="cover"
                transition={300}
                style={{
                    width: '100%',
                    height,
                    borderRadius: 20,
                }}
            />
            {/* {selected && (
                <View style={{position: "absolute", top: 10, right: 10, width: 28, height: 28, borderRadius: 14, backgroundColor: "#B83232",
                justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "#fff", fontWeight: "700"}}>
                        ✓
                    </Text>
                </View>
            )} */}
            {selected && (
                <View
                    style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.35)",
                    borderRadius: 20,
                    }}
                />
            )}
        </Pressable>
        </Animated.View>
    )
}

export default memo(PhotoCard)