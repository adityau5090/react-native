import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import CartContext from "../../../context/CartContext"
import Toast from "react-native-toast-message";

const CartScreen = () => {
  const { cartItems, setCartItems, setOrder, order }: any = useContext(CartContext);

  const [isPlaced, setIsPlaced] = React.useState(false);

  const handleCheckout = () => {
    setOrder((prev: any[]) => [
      ...prev,
      {
        id: Date.now(),
        items: cartItems,
        total: finalPrice,
      },
    ]);

    setCartItems([]);
    setIsPlaced(true);
    Toast.show({
      type: "success",
      text1: "Ordered Succussfully",

      position: "top",
    })
  };

  const increaseQty = (id: string) => {
    setCartItems((prev: any[]) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id: string) => {
    setCartItems((prev: any[]) =>
      prev
        .map((item) =>
          item.id === id
            ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
            : item
        )
    );
  };


  const removeItem = (id: string) => {
    setCartItems((prev: any[]) =>
      prev.filter((item) => item.id !== id)
    );
  };


  const total = cartItems.reduce(
    (sum: number, item: any) =>
      (sum + Number(item.price) * Number(item.quantity)),
    0
  );

  const finalPrice = total + 40 - 20

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Your Cart 🛒</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Cart is empty 😴</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>


              <Image source={{ uri: item.image }} style={styles.image} />


              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>₹{item.price}</Text>
              </View>


              <View style={styles.qtyBox}>
                <TouchableOpacity onPress={() => decreaseQty(item.id)}>
                  <Text style={styles.qtyBtn}>−</Text>
                </TouchableOpacity>

                <Text style={styles.qtyText}>{item.quantity}</Text>

                <TouchableOpacity onPress={() => increaseQty(item.id)}>
                  <Text style={styles.qtyBtn}>＋</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Text style={{ color: "red", marginLeft: 10 }}>✕</Text>
              </TouchableOpacity>

            </View>
          )}
        />
      )}


      {cartItems.length > 0 && (
        <View style={styles.footer}>

          <View style={styles.billCard}>

            <View style={styles.rowBetween}>
              <Text style={styles.billText}>Subtotal</Text>
              <Text style={styles.billText}>₹{total}</Text>
            </View>

            <View style={styles.rowBetween}>
              <Text style={styles.billText}>Delivery Fee</Text>
              <Text style={styles.billText}>₹40</Text>
            </View>

            <View style={styles.rowBetween}>
              <Text style={[styles.billText, { color: "red" }]}>
                Discount
              </Text>
              <Text style={{ color: "green" }}>-₹20</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.rowBetween}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>
                ₹{finalPrice}
              </Text>
            </View>

          </View>

          <TouchableOpacity
            style={[
              styles.checkoutBtn,
              isPlaced && { backgroundColor: "#999" },
            ]}
            onPress={handleCheckout}
            disabled={isPlaced}
          >
            <Text style={styles.checkoutText}>
              {isPlaced ? "Order Placed ✅" : "Order Now"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#777",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 5,
    alignItems: "center",
    elevation: 5,

  },

  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 5
  },

  name: {
    fontWeight: "bold",
  },

  price: {
    color: "#666",
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 8,
  },

  qtyBtn: {
    fontSize: 20,
    paddingHorizontal: 8,
  },

  qtyText: {
    marginHorizontal: 5,
  },

  footer: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 15,
    marginTop: 10,
  },

  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  checkoutBtn: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
  },

  billCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  billText: {
    color: "#555",
    fontSize: 14,
  },

  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },

  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
});