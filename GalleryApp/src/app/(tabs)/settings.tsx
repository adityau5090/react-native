import { View, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";

export default function SettingsScreen() {
  const colors = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 24,
        }}
      >
        Settings
      </Text>
    </View>
  );
}