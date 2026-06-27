import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useTheme } from "@/theme";

const Achievements = () => {
  const colors = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.badge, {color: colors.text}]}>
        🥉 7 Days
      </Text>

      <Text style={[styles.badge, {color: colors.text}]}>
        🥈 30 Days
      </Text>

      <Text style={[styles.badge, {color: colors.text}]}>
        🔥 Consistent
      </Text>

      <Text style={[styles.badge, {color: colors.text}]}>
        ⭐ Habit Master
      </Text>
    </View>
  );
}

export { Achievements }

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  badge: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#FFD70022",
  },
});