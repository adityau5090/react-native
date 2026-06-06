import { View, Text, StyleSheet } from "react-native";
import { Colors, Typography } from "@/theme";

export function DashboardHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Good Evening 👋
      </Text>

      <Text style={styles.name}>
        Aditya
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  greeting: {
    color: Colors.textSecondary,
  },

  name: {
    color: Colors.text,

    fontSize: Typography.h2,

    fontWeight: "700",
  },
});