import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
}
const MenuItem = ({ icon, title }: Props) => {
  const colors = useTheme();

  return (
    <Pressable style={styles.menuItem}>
      <Ionicons
        name={icon}
        size={24}
        color={colors.text}
      />

      <Text
        style={{
          color: colors.text,
          marginLeft: 15,
          fontSize: 16,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}

export { MenuItem }

const styles = StyleSheet.create({
    menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
  },
})