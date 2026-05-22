import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";

const OnboardingScreen = () => {
  const { isLoggedIn }: any = useContext(AuthContext);
  const navigation = useNavigation<any>();

  const handleStart = () => {
    if (isLoggedIn) {
      navigation.replace("MainApp");
    } else {
      navigation.replace("Login");
    }
  };

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="green"/>
        <ImageBackground source={require("../../../assets/launch-bg.png")}
        style={styles.launchImage} resizeMode= "cover">
      {/* <Text style={styles.title}>Welcome to Bite </Text> */}
      <Text style={styles.sub}>
        Order your favorite food anytime 🍔
      </Text>

      <TouchableOpacity style={styles.btn} onPress={handleStart}>
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16a34a",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },

  sub: {
    color: "#eee",
    marginVertical: 10,
    marginHorizontal: 15,
    textAlign: "center"
  },

  btn: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 35
  },

  btnText: {
    color: "#16a34a",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15
  },
  launchImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  }
});