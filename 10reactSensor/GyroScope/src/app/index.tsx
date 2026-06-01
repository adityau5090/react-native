import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GyroscopeCard } from "@/components/gyroScope-card"
export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <GyroscopeCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
