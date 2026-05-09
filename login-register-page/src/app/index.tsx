import { Text, View, StyleSheet, TextInput, Image, Linking, Pressable, Alert, Switch } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
 
export default function Index() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [onFocus, setOnFocus] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleLogin = () => {
    const dummyEmail = "admin@gmail.com";
    const dummyPassword =  "123456";

    if(email == dummyEmail && password == dummyPassword){
      Alert.alert("Success, logged in")
    } else {
      Alert.alert("Error 404")
    }

  }

  return (
    <View style={{ backgroundColor: isDarkMode ? "#111" : "#fff", flex:1, alignItems: "center", justifyContent: "flex-start"}}>
      
      <View style={{ 
        gap: 12
      }}>

      <View>
        <Image 
      source={require("@/assets/images/mylogo.png")}
      style={{
        width: 200,
        height: 200,
        marginInline: "auto"
      }}
      />  

      <Text
      style={{ 
        color: isDarkMode ? "#fff" : "#111",
        marginTop: -20,
        textAlign: "center",
        fontSize: 25
      }}
      >Sign Up Here</Text>

      <Switch 
      value={isDarkMode}
      onValueChange={setIsDarkMode}
      />
      </View>
      
      <Text style={{ marginLeft: 5, marginBottom: -7, color: isDarkMode ? "#fff": "#111"}}>Email</Text>
      <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    borderWidth: onFocus ? 2 : 1,
    borderColor: onFocus ? "#97E12E" : "#111",
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 300,
    paddingHorizontal: 10,
  }}
>
  <MaterialIcons
    name="email"
    size={22}
    color= "#111"
  />

  <TextInput
    style={{
      flex: 1,
      padding: 10,
    }}
    placeholder="Enter your email"
    onFocus={() => setOnFocus(true)}
    onBlur={() => setOnFocus(false)}
    value={email}
    onChangeText={setEmail}
    keyboardType="email-address"
  />
</View>

    <Text style={{ marginLeft: 5, marginBottom: -7, color: isDarkMode ? "#fff": "#111"}}>Password</Text>
     <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    borderWidth: onFocus ? 2 : 1,
    borderColor: onFocus ? "#97E12E" : "#111",
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 300,
    paddingHorizontal: 10,
  }}
>
  <MaterialIcons
    name="password"
    size={22}
    color= "#111"
  />

  <TextInput
    style={{
      flex: 1,
      padding: 10,
    }}
    placeholder="Enter your password"
    onFocus={() => setOnFocus(true)}
    onBlur={() => setOnFocus(false)}
    value={password}
    onChangeText={setPassword}
    secureTextEntry
  />
</View>

<Pressable
onPress={handleLogin}
style={{ width: 300, flexDirection:"column", alignItems: "center", backgroundColor: "#97E12E",
  paddingVertical: 10, borderRadius: 10
}}>
    <Text>Sign Up</Text>
  </Pressable>

      <Text style={{ marginTop: 10, textAlign: "center", color: isDarkMode ? "#fff": "#111"}}>
        Already have an Account? 
        <Text
        style= {{color : "#97E12E" }}
        onPress={() => router.push("/login")}
        >Sign-in</Text>
      </Text>

      </View>

      
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     backgroundColor: isDa
//   },
// });
