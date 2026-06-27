import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useTheme } from "@/theme";

const DATA = [
  { day: "Mon", value: 80 },
  { day: "Tue", value: 60 },
  { day: "Wed", value: 40 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 100 },
  { day: "Sun", value: 50 },
];

const WeeklyProgress = () => {
  const colors = useTheme();

  return (
    <View>
      {DATA.map((item) => (
        <View
          key={item.day}
          style={styles.row}
        >
          <Text
            style={{
              color: colors.text,
              width: 40,
            }}
          >
            {item.day}
          </Text>

          <View
            style={[
              styles.track,
              {
                backgroundColor:
                  colors.background,
              },
            ]}
          >
            <View
              style={[
                styles.fill,
                {
                  width: `${item.value}%`,
                  backgroundColor:
                    colors.primary,
                },
              ]}
            />
          </View>

          <Text
            style={{
              color:
                colors.textSecondary,
            }}
          >
            {item.value}%
          </Text>
        </View>
      ))}
    </View>
  );
}

export { WeeklyProgress }

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  track: {
    flex: 1,
    height: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },

  fill: {
    height: "100%",
    borderRadius: 20,
  },
});