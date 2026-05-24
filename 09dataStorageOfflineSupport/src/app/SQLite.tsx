import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SQLite from "expo-sqlite"
import { Link, useRouter } from 'expo-router'

const SQLiteDb = () => {
    const router = useRouter();
    const db = SQLite.openDatabaseSync("demo.db")

    const [output, setOutput] = useState("")

    const createTable = () => {
        db.execSync(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER
      );` 
    )
    setOutput("Table created")
    }

    const insertUser = () => {
    db.runSync(
      "INSERT INTO users (name , age) VALUES (? , ?)",
      "Aditya",
      20
    )}

    const getUsers = () => {
    const users = db.getAllSync(
      "SELECT * FROM users"
    )
    setOutput(JSON.stringify(users, null, 2))
    }

    const getFirstUser = () => {
    const user = db.getFirstSync(
      "SELECT * FROM users"
    )
    setOutput(JSON.stringify(user,null, 2))
    }

    const updateUser = () => {
    db.runSync(
      "UPDATE users SET age = ? WHERE id = ?",
      25,
      1
    )
    setOutput("user updated")
    }  

    const deleteUser = () => {
        db.runSync(
            "DELETE FROM users WHERE id = ?",
            1
        )
        setOutput("User deleted")
    }

    const dropTable = () => {
        db.runSync(
            "DROP TABLE IF EXISTS users"
        )
        setOutput('Table dropped')
    }

    useEffect(() => {
        createTable()
    },[])

    const goHome = () => {
        router.replace("/")
    } 

  return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Secure Store</Text>
          <Pressable style={styles.link} onPress={goHome}><Text>Home</Text></Pressable>
        </View>
        <Pressable style={styles.btn}  onPress={createTable} ><Text style={styles.btnText}>CreateTable</Text></Pressable>
        <Pressable style={styles.btn}  onPress={insertUser} ><Text style={styles.btnText}>InsertUser</Text></Pressable>
        <Pressable style={styles.btn}  onPress={getUsers} ><Text style={styles.btnText}>GetUsers</Text></Pressable>
        <Pressable style={styles.btn}  onPress={getFirstUser} ><Text style={styles.btnText}>GetFirstUser</Text></Pressable>
        <Pressable style={styles.btn}  onPress={updateUser} ><Text style={styles.btnText}>UpdateUser</Text></Pressable>
        <Pressable style={styles.btn}  onPress={deleteUser} ><Text style={styles.btnText}>DeleteUser</Text></Pressable>
        <Pressable style={styles.btn}  onPress={dropTable} ><Text style={styles.btnText}>DropTable</Text></Pressable>
  
        <View>
          <Text>Output : {output}</Text>
        </View>
      </View>
    );

}

export default SQLiteDb

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