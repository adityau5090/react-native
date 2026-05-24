import { useState } from "react";
import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStorage from "expo-secure-store"
import * as SQLite from "expo-sqlite"
import {File, Directory, Paths} from "expo-file-system"
import { Link } from "expo-router";

export default function Index() {
  const [output, setOutput] = useState("")


  const saveData = async ()=> {
    await AsyncStorage.setItem("user", "Suraj")
    setOutput("Data Saved")
  }

  const getData = async ()=> {
    const value = await AsyncStorage.getItem("user")
    setOutput(value!)
  }

  const removeData = async ()=> {
    await AsyncStorage.removeItem("user")
    setOutput("")
  }

  const clearStorage = async ()=> {
    await AsyncStorage.clear()
    setOutput("")
  }

  const getKeys = async ()=> {
    const keys = await AsyncStorage.getAllKeys()
    console.log(keys)
  }

  const saveMultiple = async ()=> {
    const values = await AsyncStorage.multiSet([
      ["name", "Aditya"],
      ["password", "Tamanna"]
    ])
  }

  const getMultiple = async () => {
    const values = await AsyncStorage.multiGet(["user", "name", "password"])
    console.log(values)
  }


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Async Storage</Text>
        <Link style={styles.link} href="/secureStorage"><Text>Secure Storage</Text></Link>
      </View>
      <Pressable style={styles.btn}  onPress={saveData} ><Text style={styles.btnText}>SaveData</Text></Pressable>
      <Pressable style={styles.btn}  onPress={getData} ><Text style={styles.btnText}>GetData</Text></Pressable>
      <Pressable style={styles.btn}  onPress={removeData} ><Text style={styles.btnText}>RemoveData</Text></Pressable>
      <Pressable style={styles.btn}  onPress={clearStorage} ><Text style={styles.btnText}>ClearStorage</Text></Pressable>
      <Pressable style={styles.btn}  onPress={getKeys} ><Text style={styles.btnText}>GetAllKeys</Text></Pressable>
      <Pressable style={styles.btn}  onPress={saveMultiple} ><Text style={styles.btnText}>SaveMultiple</Text></Pressable>
      <Pressable style={styles.btn}  onPress={getMultiple} ><Text style={styles.btnText}>GetMultiple</Text></Pressable>

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
