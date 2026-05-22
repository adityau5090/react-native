import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

const ProfileScreen = () => {
  const { name, image, address, logout }: any = useContext(AuthContext);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image source={require("../../../../assets/Black-Logo.png")} style={styles.logo} />
        <Text style={styles.tagline}>
          Taste the best food around you
        </Text>
      </View>

      <Image
        source={{
          uri:
            image ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        }}
        style={styles.avatar}
      />


      <Text style={styles.name}>{name || "Guest User"}</Text>


      <View style={styles.infoCard}>
        <Text style={styles.label}>📍 Address</Text>
        <Text style={styles.value}>
          {address || "No address added"}
        </Text>
      </View>


      <View style={styles.infoCard}>
        <Text style={styles.label}>About Bite</Text>
        <Text style={styles.desc}>
          Bite is your go-to food delivery app. Discover delicious meals,
          order instantly, and enjoy fast delivery at your doorstep.
        </Text>
      </View>


      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f2f2",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    height: 100,
    width: 100,
    color : ""
  },

  tagline: {
    color: "#6f6e6e",
    fontSize: 12,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 10,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111",
  },

  infoCard: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },

  label: {
    color: "#777",
    fontSize: 12,
  },

  value: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },

  desc: {
    marginTop: 5,
    color: "#555",
    lineHeight: 18,
  },

  logoutBtn: {
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});