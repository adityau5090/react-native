import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AuthContext from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

const CustomDrawer = (props: any) => {
  const { name, image, logout }: any = useContext(AuthContext);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View style={styles.userCard}>
        <Image
          source={{
            uri:
              image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          style={styles.avatar}
        />

        <View>
          <Text style={styles.name}>{name || "Guest User"}</Text>
          <Text style={styles.sub}>View Profile</Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#aaa" />
      </View>

      <View style={styles.menu}>
        <DrawerItemList {...props} />
      </View>
      <View style={styles.bottomSection}>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={18} color="#fff" />
          <Text style={styles.logoutText}> Logout</Text>
        </TouchableOpacity>

        <Text style={styles.version}>App v1.0.0</Text>
      </View>

    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },

  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1a1a1a",
    marginBottom: 10,
    justifyContent: "space-between",
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  sub: {
    color: "#aaa",
    fontSize: 12,
  },

  menu: {
    flex: 1,
  },

  bottomSection: {
    padding: 15,
    borderTopWidth: 0.5,
    borderColor: "#333",
  },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ef4444",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },

  version: {
    color: "#777",
    textAlign: "center",
    marginTop: 10,
    fontSize: 12,
  },
});