import { Button } from "@react-navigation/elements";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Switch,
  FlatList,
} from "react-native";

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false) 

  const items = Array.from(
    { length: 20 },
    (_, i) => `Item ${i + 1}`
  );

  const USERS = [
  { id: '1', name: 'Alice Johnson', role: 'Designer' },
  { id: '2', name: 'Bob Smith', role: 'Developer' },
  { id: '3', name: 'Carol White', role: 'Manager' },
  { id: '4', name: 'David Brown', role: 'Developer' },
  { id: '5', name: 'Eve Davis', role: 'Designer' },
];


  return (
    <View style={{ flex: 1,
      backgroundColor: isDarkMode ? "#111" : "#fff",
     }}>
      <Text numberOfLines={3} style={{}}>
        Hello World Lorem ipsum dolor sit amet.
      </Text>

      <Image
        source={{
          uri: "https://images.pexels.com/photos/2433614/pexels-photo-2433614.jpeg",
        }}
        style={{
          width: 100,
          height: 100,
        }}
      />

      <Image
        source={require("@/assets/images/h.png")}
        style={{
          height: 200,
          width: 200,
        }}
        blurRadius={4}
      />

      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        placeholderTextColor={"red"}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          marginTop: 10,
          fontSize: 20,
        }}
      />

      <Pressable
        onPress={() => alert("Pressed")}
        style={({ pressed }) => ({
          backgroundColor: pressed ? "#4a42d4" : "#6C6",
          padding: 10,
          marginTop: 10,
        })}
        hitSlop={{
          bottom: 50,
        }}
      >
        {({ pressed }) =>
          pressed ? (
            <Text>Pressing...</Text>
          ) : (
            <Text>Press me</Text>
          )
        }
      </Pressable>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 16,
          alignItems: "center",
        }}
      >
        {items.map((item) => (
          <View
            key={item}
            style={{
              backgroundColor: "white",
              padding: 16,
              borderRadius: 10,
              marginBottom: 10,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 16 }}>{item}</Text>
          </View>
        ))}
      </ScrollView>

      <Switch
      value={isDarkMode}
        onValueChange={setIsDarkMode}>
      </Switch>

      <FlatList 
      data={USERS}
      // horizontal
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 15, backgroundColor: "green"}}
      renderItem={({item }) => <Text>{item.name}</Text>}
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: "black"}} />
      )}
      />
    </View>
  );
}