import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import CartContext from "../../../context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import { resturantMenu } from "../../../FoodData/FoodData";
import Toast from "react-native-toast-message";
const categories = ["All", "Drinks", "Pizza", "Salad", "Toast"];

const RestaurantScreen = () => {
  const route: any = useRoute();
  const navigation = useNavigation<any>();
  const { restaurant } = route.params;


  const { cartItems, setCartItems }: any = useContext(CartContext)

  const menu = resturantMenu[restaurant?.name?.trim()] || []

  const [selectedCategory, setSelectedCategory] = useState("All");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}
          style={{ marginRight: 15 }}
        >
          <Ionicons name="cart-outline" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);


  const filteredMenu =
    selectedCategory === "All"
      ? menu
      : menu.filter((item: any) => item.category === selectedCategory);


  const addToCart = (item: any) => {

    setCartItems((prev: any[]) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });

    Toast.show({
      type: "success",
      text1: "Added to Cart 🛒",

      position: "top",
    })
  };


  const isInCart = (id: string) => {
    return cartItems.some((item: any) => item.id === id);
  };

  return (
    <FlatList
      data={filteredMenu}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}

      ListHeaderComponent={
        <>

          <ImageBackground source={{ uri: restaurant.image }} style={styles.topImage}
            blurRadius={2}>

            <Text style={[styles.mainTitle,]}>{restaurant.name}</Text>
          </ImageBackground>


          <View style={styles.headcard}>
            

            <FlatList
              horizontal
              data={categories}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              style={{ marginVertical: 10 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.category,
                    selectedCategory === item && styles.activeCategory,
                  ]}
                  onPress={() => setSelectedCategory(item)}
                >
                  <Text
                    style={{
                      color: selectedCategory === item ? "#fff" : "#000",
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </>
      }

      renderItem={({ item }) => (

        <TouchableOpacity
          style={styles.card}
        >
          <Image source={{ uri: item.image }} style={styles.image} />

          <View style={styles.cardContent}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 5 }}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.sub}>₹{item.price}</Text>
            </View>

            {isInCart(item.id) ? (
              <TouchableOpacity
                style={styles.goToCartBtn}
                onPress={() => navigation.navigate("Cart")}
              >
                <Text style={styles.goToCartText}>Go to Cart</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.addText}>Add to Cart</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>


      )}
    />
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  topImage: {
    width: "100%",
    height: 220,
    flex: 1,
    justifyContent: "flex-end",
  },
  mainTitle : {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 5,
    paddingHorizontal: 10, 
    backgroundColor: "#4ba34ca3", 
    alignSelf: "flex-start", 
    margin: 10, 
    borderRadius: 25,
    elevation: 15
  },


  category: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 10,
  },

  activeCategory: {
    backgroundColor: "green",
  },


  menuCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },

  menuImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },

  menuTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },

  menuPrice: {
    color: "#666",
  },

  addBtn: {
    backgroundColor: "green",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },

  addText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },
  headcard: {
    backgroundColor: "#fff",
    marginBottom: 15,
    overflow: "hidden",
    elevation: 4,
    padding: 10
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 4,
    margin: 10
  },

  image: {
    width: "100%",
    height: 200,
  },


  cardContent: {
    padding: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  sub: {
    color: "#666",
    marginTop: 5,
  },
  goToCartBtn: {
    backgroundColor: "#111",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },

  goToCartText: {
    color: "#fff",
    fontWeight: "bold",
  },
});