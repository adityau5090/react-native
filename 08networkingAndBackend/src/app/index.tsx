import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("https://api.freeapi.app/api/v1/public/randomusers?page=1&1limit=10");
        const data = await res.json()
        console.log("Data :", data);
        setData(data)
      } catch (error) {
        console.log("Error in fetching : ", error)
      }
    }
    fetchUserData();
  }, [])
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
