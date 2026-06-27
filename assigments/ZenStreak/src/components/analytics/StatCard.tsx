import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useTheme } from "@/theme";

interface Props {
  emoji: string;
  value: number;
  label: string;
}

const StatCard = ({
  emoji,
  value,
  label,
}: Props) => {
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
      <Text style={styles.emoji}>
        {emoji}
      </Text>

      <Text
        style={[
          styles.value,
          { color: colors.text },
        ]}
      >
        {value}
      </Text>

      <Text
        style={[
          styles.label,
          {
            color:
              colors.textSecondary,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export { StatCard }

const styles = StyleSheet.create({
  card: {
    width: "48%",
    padding: 20,
    borderRadius: 24,
    alignItems: "center",
  },

  emoji: {
    fontSize: 28,
  },

  value: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: "700",
  },

  label: {
    marginTop: 5,
  },
});