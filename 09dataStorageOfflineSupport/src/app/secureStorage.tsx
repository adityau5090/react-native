import { Link } from "expo-router";
import * as SecureStorage from "expo-secure-store";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [output, setOutput] = useState<any>("")


  const saveData = async ()=> {
    await SecureStorage.setItemAsync("user", "Aditya")
    setOutput("Data Saved")
  }

  const getData = async ()=> {
    const value = await SecureStorage.getItemAsync("user")
    setOutput(value!)
  }

  const deleteData = async ()=> {
    await SecureStorage.deleteItemAsync("user")   
    setOutput("Deleted")
  }

  const isAvailable = async ()=> {
    //Check wether SecureStore api is enabled on current device or not
    const available = await SecureStorage.isAvailableAsync()
    setOutput(JSON.stringify(available));
  }

  const saveObject = async () => {
    const user = {
        name: "Tamanna",
        role: "Owner",
    }
    await SecureStorage.setItemAsync("love", JSON.stringify({user}))
    setOutput("Object saved")
  }

  const getObject = async () => {
    const object = await SecureStorage.getItemAsync("love")
    setOutput(object)
  }


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Secure Store</Text>
        <Link style={styles.link} href="/SQLite"><Text>SQLite</Text></Link>
      </View>
      <Pressable style={styles.btn}  onPress={saveData} ><Text style={styles.btnText}>SaveData</Text></Pressable>
      <Pressable style={styles.btn}  onPress={getData} ><Text style={styles.btnText}>GetData</Text></Pressable>
      <Pressable style={styles.btn}  onPress={deleteData} ><Text style={styles.btnText}>RemoveData</Text></Pressable>
      <Pressable style={styles.btn}  onPress={isAvailable} ><Text style={styles.btnText}>IsAvailable</Text></Pressable>
      <Pressable style={styles.btn}  onPress={saveObject} ><Text style={styles.btnText}>SaveObject</Text></Pressable>
      <Pressable style={styles.btn}  onPress={getObject} ><Text style={styles.btnText}>GetObject</Text></Pressable>

      <View>
        <Text>Output : {output}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  titleContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 5
  },
  link: {
    backgroundColor: "red",
    color: "#fff",
    padding: 10,
    borderRadius: 8
  },
  btn:{
    backgroundColor: "#184fcf",
    width: "100%",
    padding: 10,
    marginVertical: 5,
    textAlign: "center",
    borderRadius: 10
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  }
});
