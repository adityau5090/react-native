import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  onPress?: () => void;
}

export default function TabBarButton({
  icon,
  focused,
  onPress,
}: Props) {
  const colors = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        focused && {
          backgroundColor: colors.primary,
        },
      ]}
    >
      <Ionicons
        name={icon}
        size={24}
        color={focused ? "#fff" : colors.textSecondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
});