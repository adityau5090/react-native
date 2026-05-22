import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import React, { useContext } from "react";
import CartContext from "../../../context/CartContext";

const OrdersScreen = () => {
  const { order }: any = useContext(CartContext);
// console.log(order)
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Your Orders 📦</Text>

      {order.length === 0 ? (
        <Text style={styles.empty}>No orders yet 😴</Text>
      ) : (
        <FlatList
          data={order}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>

              <View style={styles.rowBetween}>
                <Text style={styles.orderId}>
                  Order #{item.id}
                </Text>
                <Text style={styles.total}>
                  ₹{item.total}
                </Text>
              </View>

              {item?.items?.map((food: any) => (
                <View key={food.id} style={styles.itemRow}>

                  <Image
                    source={{ uri: food.image }}
                    style={styles.image}
                  />

                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>
                      {food.name}
                    </Text>
                    <Text style={styles.sub}>
                      ₹{food.price} × {food.quantity}
                    </Text>
                  </View>

                </View>
              ))}

            </View>
          )}
        />
      )}

    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
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

  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 4,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  orderId: {
    fontWeight: "bold",
  },

  total: {
    fontWeight: "bold",
    color: "green",
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },

  name: {
    fontWeight: "bold",
  },

  sub: {
    color: "#666",
  },
});