import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LightMeter } from "@/components/light-meter";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LightMeter />
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
