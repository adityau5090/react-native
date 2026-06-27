import { View, StyleSheet } from "react-native";

const StreakHeatmap = () => {
  const cells = Array.from({
    length: 49,
  });

  return (
    <View style={styles.container}>
      {cells.map((_, index) => (
        <View
          key={index}
          style={[
            styles.cell,
            {
              backgroundColor:
                index % 4 === 0
                  ? "#216e39"
                  : index % 3 === 0
                  ? "#40c463"
                  : "#ebedf0",
            },
          ]}
        />
      ))}
    </View>
  );
}

export { StreakHeatmap }

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  cell: {
    width: 18,
    height: 18,
    borderRadius: 4,
  },
});