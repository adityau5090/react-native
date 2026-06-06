import { Text, View, StyleSheet } from "react-native";

import { Colors, Typography } from "@/theme";

export function DriveHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Drive Active
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  title: {
    color: Colors.text,

    fontSize: Typography.h3,

    fontWeight: "700",
  },
});