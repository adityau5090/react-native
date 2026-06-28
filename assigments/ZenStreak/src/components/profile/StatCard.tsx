import { useTheme } from "@/theme";
import { StyleSheet, Text, View } from "react-native";

interface Props {
    value: number | string;
    title: string;
    emoji: string;
}

const StatCard = ({title,value,emoji} : Props ) => {
  const colors = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor:
            colors.card,
        },
      ]}
    >
      <Text style={{ fontSize: 28 }}>
        {emoji}
      </Text>

      <Text
        style={{
          color: colors.text,
          fontSize: 24,
          fontWeight: "700",
        }}
      >
        {value}
      </Text>

      <Text
        style={{
          color:
            colors.textSecondary,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

export { StatCard }

const styles = StyleSheet.create({
    card: {
    width: "48%",
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    marginBottom: 15,
  },
})