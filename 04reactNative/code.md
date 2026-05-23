import { Text, View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView,useSafeAreaInsets } from "react-native-safe-area-context";

function UnsafeScreen() {
  
  return (
    <View style={{ flex: 1, backgroundColor: "#111"}}>
      <Text style={{ color: "#fff", fontSize: 18, padding: 16 }}>
        Header (bleeds under notch!)
      </Text>
      <Text style={{ color: "#aaa", padding: 16 }}>
        This content might be hidden behind the status bar in dark mode.
      </Text>

    </View>
  )
}
function SafeScreen() {
  return (
    <SafeAreaView edges={["bottom", "top", "left"]} style={{ flex: 1, backgroundColor: "#111"}}>
      <Text style={{ color: "#fff", fontSize: 18, padding: 16 }}>
        Header (bleeds under notch!)
      </Text>
      <Text style={{ color: "#aaa", padding: 16 }}>
        This content respect safe area 
      </Text>

    </SafeAreaView>
  )
}
export default function Index() {
  const insets  =  useSafeAreaInsets()
  const isActive = true

  const buttonStyle = StyleSheet.compose(
    styles.button,
    isActive ? styles.button : null
  )
  // console.log(insets)
  return (
    // <UnsafeScreen />
    // <SafeScreen />
    // <SafeAreaView>
    <View
    // style={{
    //   flex: 1,
    //   paddingTop: insets.top,
    //   paddingBottom: insets.bottom,
    //   // backgroundColor: "red"
    // }}
    style={styles.container}
    >
      {/* <StatusBar barStyle={"default"} /> */}
      <View style={buttonStyle}>
        <Text style={styles.buttonText}>Composed Style</Text>
      </View>
      <Text>Home Screen</Text>

      {/* <View style={styles.card}>
        <Text style={styles.title}>Home Screen</Text>
        <Text style={styles.subtitile}>Hello Ekaksh</Text>
      </View> */}


    </View>
  //  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    backgroundColor: '#ccc',   // Default grey
  },
  activeButton: {
    backgroundColor: '#6C63FF', // Override to purple when active
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


<!-- ****************************************************************** -->


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const styleA = StyleSheet.create({text: { color: "red", fontSize: 16}})
const styleB = StyleSheet.create({text: { fontSize: 24, fontWeight: "bold"}})

const flat = StyleSheet.flatten([styleA.text, styleB.text])

const HomeScreen = () => {
  return (
    <SafeAreaView>
    <View>
      <Text style={flat}>HomeScreen</Text>
    </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})