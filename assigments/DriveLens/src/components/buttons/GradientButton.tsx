import { Pressable, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Gradients, Radius } from "@/theme";


type GradientButtonProps = {
  title: string;
  onPress?: () => void;
};

export function GradientButton({
  title,
  onPress,
}: GradientButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={Gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },
});