import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { resturantMenu } from "../../FoodData/FoodData";

const SearchScreen = () => {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  const allFoods = Object.entries(resturantMenu).flatMap(
    ([restaurant, foods]: any) =>
      foods.map((item: any) => ({
        ...item,
        restaurant,
      }))
  );
  // console.log(allFoods)

  const filtered = allFoods.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.restaurant.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchClick = (item: any) => {
    setRecent((prev) =>
      [item.name, ...prev.filter((i) => i !== item.name)].slice(0, 5)
    );

    navigation.navigate("Restaurant", {
      restaurant: {
        name: item.restaurant,
        image: item.image,
      },
    });
  };

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Search for food, restaurant..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />


      {search === "" && recent.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          {recent.map((item, index) => (
            <Text key={index} style={styles.recentItem}>
              🔍 {item}
            </Text>
          ))}
        </View>
      )}


      {search === "" && (
        <View>
          <Text style={styles.sectionTitle}>Popular</Text>
          <Text style={styles.recentItem}>🍕 Pizza</Text>
          <Text style={styles.recentItem}>🍔 Burger</Text>
          <Text style={styles.recentItem}>🥤 Drinks</Text>
        </View>
      )}

      <Text style={styles.title}>Foods and Beverages</Text>

      {search !== "" && filtered.length === 0 && (
        <Text style={styles.empty}>No results found 😢</Text>
      )}

      {search === "" ? (
        <FlatList
          data={allFoods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleSearchClick(item)}
            >
              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.sub}>{item.restaurant}</Text>
                <Text style={styles.price}>₹{item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleSearchClick(item)}
            >
              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.sub}>{item.restaurant}</Text>
                <Text style={styles.price}>₹{item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },

  search: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },

  sectionTitle: {
    fontWeight: "bold",
    marginVertical: 10,
    fontSize: 16,
  },

  recentItem: {
    paddingVertical: 8,
    color: "#555",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    elevation: 3,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },

  name: {
    fontWeight: "bold",
    fontSize: 16,
  },

  sub: {
    color: "#777",
  },

  price: {
    color: "#16a34a",
    fontWeight: "bold",
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    textAlign: "center"
  }
});