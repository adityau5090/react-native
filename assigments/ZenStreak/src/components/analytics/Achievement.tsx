import {
  View,
  Text,
  StyleSheet,
} from "react-native";

const Achievements = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>
        🥉 7 Days
      </Text>

      <Text style={styles.badge}>
        🥈 30 Days
      </Text>

      <Text style={styles.badge}>
        🔥 Consistent
      </Text>

      <Text style={styles.badge}>
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