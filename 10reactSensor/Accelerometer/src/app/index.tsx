import { useAccelerometer } from "@/hooks/useAccelerometer";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

export default function Index() {
  // const { available, x, y, z} = useAccelerometer()
  // console.log(available, x, y, z)
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1220",
  },
});