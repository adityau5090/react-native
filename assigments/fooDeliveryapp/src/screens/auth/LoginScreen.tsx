import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

const LoginScreen = () => {
  const { login, name,setName, password,setPassword,image, setImage,address, setAddress }: any = useContext(AuthContext)

  return (
    <ScrollView style={styles.container}>

      <View style={styles.logoContainer}>
        <Image source={require("../../../assets/Black-Logo.png")} 
        style={styles.logo} />
      </View>
      <Text style={styles.heading}>Welcome to Bite 👋</Text>
      <Text style={{fontSize: 17, marginBottom: 15}}>Taste of India</Text>
      <Text style={styles.sub}>
        Login to continue ordering food
      </Text>

      {image ? (
        <Image source={{ uri: image }} style={styles.avatar} />
      ) : null}

      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Profile image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn}
      onPress={() => 
        login({
          name,
          password,
          image,
          address
        })
      }>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111",
  },

  sub: {
    color: "#666",
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center"
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginVertical: 15,
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  btn: {
    backgroundColor: "#16a34a", // your app green
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});