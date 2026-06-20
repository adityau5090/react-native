import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";
import { useSelectionStore } from "@/store/selection.store";
import { heavyImpact } from "@/services/haptics.service";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useEffect } from "react";

const SelectionBar = () => {
  const colors = useTheme();

  const { selectedIds, clearSelection } = useSelectionStore();

  const translateY = useSharedValue(-100);

  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 250,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const handleBackPress = async () => {
    await heavyImpact();
    clearSelection();
  };  

  return (
    <Animated.View style={animatedStyle}>
      <View
      style={{
        height: 80,
        paddingHorizontal: 20,
        paddingTop: 20,
        marginBottom: 20,

        flexDirection: "row",
        alignItems: "center",

        borderBottomWidth: 1,
        borderBottomColor: colors.border,

        backgroundColor: colors.background,
      }}
    >
      <Pressable
        onPress={handleBackPress}
        style={{
          marginRight: 15,
        }}
      >
        <Ionicons
          name="arrow-back"
          size={26}
          color={colors.text}
        />
      </Pressable>

      <Text
        style={{
          color: colors.text,
          fontSize: 20,
          fontWeight: "700",
        }}
      >
        {selectedIds.length} Selected
      </Text>
    </View>
    </Animated.View>
  );
};

export { SelectionBar };