import { View, StyleSheet } from "react-native";
import { Colors, Radius, Shadows, Spacing } from "@/theme";

type Props = {
  children: React.ReactNode;
};

export function GlassCard({ children }: Props) {
  return <View style={styles.card}>
    <View style={styles.highlight} />
  {children}
    </View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,

    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: Radius.lg,

    padding: Spacing.lg,

    overflow: "hidden",

    ...Shadows.card
  },
  highlight: {
  position: "absolute",

  top: 0,
  left: 20,
  right: 20,

  height: 1,

  backgroundColor:
    "rgba(255,255,255,0.15)",
},
});