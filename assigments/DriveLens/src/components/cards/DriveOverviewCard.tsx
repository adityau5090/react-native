import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { GlassCard } from "../common/GlassCard";

import {
  Colors,
  Spacing,
} from "@/theme";

type Props = {
  timer: string;

  speed: number;

  distance: number;
};

export function DriveOverviewCard({
  timer,
  speed,
  distance,
}: Props) {
  return (
    <GlassCard>
      <Text style={styles.timer}>
        {timer}
      </Text>

      <View style={styles.statsRow}>
        <View>
          <Text style={styles.label}>
            Speed
          </Text>

          <Text style={styles.value}>
            {(speed * 3.6).toFixed(1)}
          </Text>

          <Text style={styles.unit}>
            km/h
          </Text>
        </View>

        <View>
          <Text style={styles.label}>
            Distance
          </Text>

          <Text style={styles.value}>
            {distance.toFixed(2)}
          </Text>

          <Text style={styles.unit}>
            km
          </Text>
        </View>
      </View>
    </GlassCard>
  );
}

const styles =
  StyleSheet.create({
    timer: {
      color: Colors.text,

      fontSize: 42,

      fontWeight: "800",

      textAlign: "center",

      marginBottom: 20,
    },

    statsRow: {
      flexDirection: "row",

      justifyContent:
        "space-around",
    },

    label: {
      color:
        Colors.textSecondary,

      textAlign: "center",
    },

    value: {
      color: Colors.text,

      fontSize: 28,

      fontWeight: "700",

      textAlign: "center",
    },

    unit: {
      color:
        Colors.textSecondary,

      textAlign: "center",
    },
  });