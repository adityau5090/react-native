import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

import { useTheme } from "@/theme";

const  GlassCard = ({children}: {children: React.ReactNode}) => {
  const colors = useTheme();

  return (
    <BlurView
      intensity={25}
      tint="default"
      style={[
        styles.card,
        {
          borderColor: colors.border,
          backgroundColor: colors.cardLight,
        },
      ]}
    >
      {children}
    </BlurView>
  );
}

export { GlassCard }

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 1,
    marginBottom: 10,
  },
});