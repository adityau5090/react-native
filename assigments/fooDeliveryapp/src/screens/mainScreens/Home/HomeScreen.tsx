import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AuthContext from "../../../context/AuthContext";
import { resturantMenu } from "../../../FoodData/FoodData";
import CartContext from "../../../context/CartContext";

const HomeScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { cartItems }: any = useContext(CartContext) 

  const totalItems = cartItems.reduce(
  (sum: number, item: any) => sum + item.quantity,
  0
);

// console.log(totalItems)



  const { image }: any = useContext(AuthContext)

  const restaurants = Object.entries(resturantMenu).map(
    ([name, foods]: any, index) => ({
      id: index.toString(),
      name: name,
      image: foods[0]?.image, // 👈 first food image as banner
      rating: (4 + Math.random()).toFixed(1), // fake rating
      time: `${15 + index * 5}-30 min`,
    })
  );

  const filteredRestaurants = restaurants.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}
          style={{ marginRight: 15 }}
        >
          <Ionicons name="cart-outline" size={24} color="#fff" />

          {totalItems > 0 && (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{totalItems}</Text>
    </View>
  )}
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View>
          <Text style={styles.locationLabel}>Current Location</Text>
          <Text style={styles.location}>Varanasi</Text>
        </View>

        <Image
          source={{
            uri: image,
          }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          placeholder="Search restaurants..."
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {filteredRestaurants.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No restaurants found 🍔
        </Text>
      ) : (
        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}

          ListHeaderComponent={
            <>
              <View style={styles.banner}>
                <View>
                  <Text style={styles.bannerSub}>
                  Order now & get
                </Text>
                  <Text style={styles.bannerTitle}>30% OFF</Text>
                  <Text style={styles.bannerSub}>On your first order</Text>
                <Text style={styles.bannerBtn}>Order Now</Text>
                </View>

                <Image source={require("../../../../assets/banner.png")} 
                style={styles.bannerImage} />
              </View>

              <View style={styles.sectionRow}>
                <Text style={styles.section}>Restaurants</Text>
                <Text style={styles.viewAll}>View All</Text>
              </View>
            </>
          }

          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("Resturant", {
                  restaurant: item,
                })
              }
            >

              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.title}>{item.name}</Text>

                <Text style={styles.sub}>
                  {item.time}
                </Text>
                </View>
                <Text style={styles.sub}>⭐ {item.rating}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}



    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  locationLabel: {
    fontSize: 12,
    color: "#888",
  },

  location: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 5,
    paddingLeft: 20,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
    elevation: 5,
    marginBottom: 5
  },

  input: {
    marginLeft: 10,
    flex: 1,
  },

  banner: {
    backgroundColor: "green",
    padding: 20,
    borderRadius: 15,
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  bannerSub: {
    color: "#ebeaeafe",
  },
  bannerBtn: {
    color: "#fff",
    backgroundColor: "#2dda0f",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 50,
    alignSelf: "flex-start",
    marginTop: 5
  },
  bannerImage: {
    height: 90,
    width: 90
  },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  section: {
    fontSize: 18,
    fontWeight: "bold",
  },

  viewAll: {
    color: "green",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 150,
  },

  cardContent: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },

  sub: {
    color: "#666",
    marginTop: 5,
  },

  badge: {
  position: "absolute",
  top: -1,
  right: 2,
  backgroundColor: "#111",
  borderRadius: 10,
  paddingHorizontal: 6,
  paddingVertical: 2,
},

badgeText: {
  color: "#fff",
  fontSize: 7,
  fontWeight: "bold",
},
});