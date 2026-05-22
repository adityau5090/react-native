import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";

const HelpScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* 🔥 HEADER */}
      <Text style={styles.title}>Help & Support 🤝</Text>
      <Text style={styles.sub}>
        We're here to help you with anything related to Bite
      </Text>

      {/* 📦 FAQ SECTION */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Frequently Asked Questions</Text>

        <Text style={styles.question}>❓ How to place an order?</Text>
        <Text style={styles.answer}>
          Browse restaurants, select your favorite food, and tap "Add to Cart".
        </Text>

        <Text style={styles.question}>❓ How to cancel an order?</Text>
        <Text style={styles.answer}>
          You can cancel from the Orders section before it's prepared.
        </Text>

        <Text style={styles.question}>❓ Payment options?</Text>
        <Text style={styles.answer}>
          We support Cash on Delivery and online payments.
        </Text>
      </View>

      {/* 📞 CONTACT SECTION */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact Us</Text>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>📧 Email Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>📞 Call Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>💬 Live Chat</Text>
        </TouchableOpacity>
      </View>

      {/* 📱 ABOUT APP */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>About Bite 🍔</Text>

        <Text style={styles.answer}>
          Bite is a modern food delivery app designed to bring delicious meals
          right to your doorstep. Fast delivery, easy ordering, and a wide
          variety of restaurants — all in one place.
        </Text>
      </View>

      {/* 🔥 VERSION */}
      <Text style={styles.version}>App Version 1.0.0</Text>

    </ScrollView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },

  sub: {
    color: "#666",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },

  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },

  question: {
    fontWeight: "bold",
    marginTop: 10,
  },

  answer: {
    color: "#666",
    marginTop: 5,
    lineHeight: 18,
  },

  option: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },

  optionText: {
    fontSize: 15,
  },

  version: {
    textAlign: "center",
    marginTop: 20,
    color: "#aaa",
  },
});