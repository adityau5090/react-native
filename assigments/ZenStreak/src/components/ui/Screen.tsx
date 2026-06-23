
import { StyleSheet } from "react-native";

import { useTheme } from "@/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen({
  children,
}: {
  children: React.ReactNode;
}) {
  const colors = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});