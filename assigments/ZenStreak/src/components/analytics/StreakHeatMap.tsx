import React from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getCompletionHistory } from "@/db/habits.repository";
import { useThemeStore } from "@/store/useThemeStore";
import { useTheme } from "@/theme";

const GithubHeatmap = () => {
  const mode = useThemeStore((state) => state.mode)
  const colors = useTheme();

  const today = new Date();
  const history = getCompletionHistory();

  const completionMap =
    new Map(
      history.map((item: any) => [
        item.completedDate,
        item.count,
      ])
    );

const days = Array.from(
  { length: 35 },
  (_, i) => {
    const date = new Date(today);

    date.setDate(
      today.getDate() - (34 - i)
    );

    return date;
  }
);

const weeks = [];

for (let i = 0; i < days.length; i += 7) {
  weeks.push(days.slice(i, i + 7));
}

  const getLevel = (date: Date) => {
    const key = date
      .toISOString()
      .split("T")[0];

    return completionMap.get(key) || 0;
  };
  const getColor = (level: number) => {
    if (level === 0)
      return mode === "light"
        ? "#2d333b"
        : "#ebedf0";

    if (level === 1)
      return "#d58255e1";

    if (level === 2)
      return "#e2892af3";

    if (level === 3)
      return "#e98d14";

    return "#fd9503";
  };

  return (
    <View>

      <View style={styles.heatmapContainer}>
  {/* Weekday Labels */}

  <View style={styles.weekdayColumn}>
    {[
      "M",
      "T",
      "W",
      "T",
      "F",
      "S",
      "S",
    ].map((day, index) => (
      <Text
        key={index}
        style={[
          styles.weekdayText,
          {
            color:
              colors.primary,
          },
        ]}
      >
        {day}
      </Text>
    ))}
  </View>

  {/* Contribution Grid */}

  <View style={styles.weeksContainer}>
    {weeks.map((week, weekIndex) => (
        <View key={weekIndex}
          style={styles.weekColumn}>
          {week.map((date) => {
            const level = getLevel(date);

            return (
              <View key={ date.toISOString()}
                style={
                  styles.dayContainer
                }
              >
                <View
                  style={[
                    styles.cell,
                    {
                      backgroundColor:
                        getColor(
                          level
                        ),
                    },
                  ]}
                />

                <Text
                  style={[
                    styles.dateText,
                    {
                      color:
                        colors.textSecondary,
                    },
                  ]}
                >
                  {date.getDate()}
                </Text>
              </View>
            );
          })}
        </View>
      )
    )}
  </View>
</View>

      {/* Legend */}

      <View style={styles.legend}>
        <Text
          style={{
            color:
              colors.textSecondary,
          }}
        >
          Less
        </Text>

        {[0, 1, 2, 3, 4].map(
          (level) => (
            <View
              key={level}
              style={[
                styles.legendBox,
                {
                  backgroundColor:
                    getColor(level),
                },
              ]}
            />
          )
        )}

        <Text
          style={{
            color:
              colors.textSecondary,
          }}
        >
          More
        </Text>
      </View>
    </View>
  );
}

export { GithubHeatmap };

const styles = StyleSheet.create({
  

  heatmapContainer: {
  flexDirection: "row",
  marginTop: 20,
  paddingHorizontal: 25
},

weekdayColumn: {
  justifyContent: "space-between",
  marginRight: 12,
  paddingTop: 2,
  paddingRight: 10
},

weekdayText: {
  fontSize: 12,
  height: 34,
  fontWeight: "800",
},

weeksContainer: {
  flexDirection: "row",
  // flex: 1,
  gap: 20,
},

weekColumn: {
  gap: 10,
},
dayContainer: {
  alignItems: "center",
},

cell: {
  width: 22,
  height: 22,
  borderRadius: 5,
},

dateText: {
  fontSize: 9,
  marginTop: 3,
},

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  cellContainer: {
  alignItems: "center",
  width: 28,
},

  legend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 6,
  },

  legendBox: {
    width: 14,
    height: 14,
    borderRadius: 3,
  },
});