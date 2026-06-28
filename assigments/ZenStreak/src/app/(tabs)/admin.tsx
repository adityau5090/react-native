import React, {useEffect,useState} from "react";
import {StyleSheet,Text,View,FlatList,Image,ActivityIndicator,TextInput,Alert,Pressable} from "react-native";
import { useAuthStore } from "@/store/auth.store";
import { useTheme } from "@/theme";

const Admin = () => {
  const colors = useTheme();
  const token = useAuthStore((state) => state.token);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    fetchUsers();
  },[]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        "https://zenstreak-backend.onrender.com/api/admin/users",
        {
          method: "POST",
          headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      // console.log(data.users)
      setUsers(data.users || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const sendBroadcast = async () => {
    if (!title || !body) {
      return Alert.alert(
        "Error",
        "Please enter title and message."
      );
    }

    try {
      const res = await fetch(
        "https://zenstreak-backend.onrender.com/api/admin/sendBroadcastNotification",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title,
            body,
          }),
        }
      );

      const data = await res.json();

      Alert.alert(
        "Success",
        data.message
      );

      setTitle("");
      setBody("");
    } catch (error) {
      console.log(error);
    }
  };

  const sendToUser = async ( user: any) => {

    // console.log("Selected User:", user);
    if (!title || !body) {
      return Alert.alert(
        "Error",
        "Please enter title and message."
      );
    }

    try {
      const res = await fetch(
        "https://zenstreak-backend.onrender.com/api/admin/sendUserNotification",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            expoPushToken:user.expoPushToken,
            title,
            body,
          }),
        }
      );

      const data = await res.json();
      // console.log("Res : ",data)
      Alert.alert(
        "Success",
        `${data.message} to ${user.name}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers =
    users.filter((user: any) => user.email?.toLowerCase().includes(search.toLowerCase()));
  const totalUsers = users.length;
  const pushEnabledUsers = users.filter((u: any) => u.expoPushToken).length;
  const activeStreakUsers = users.filter((u: any) => u.streak > 0).length;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            colors.background,
        },
      ]}
    >

      <View style={styles.statsContainer}>
        <View
          style={[
            styles.statCard,
            {backgroundColor:colors.card},
          ]}
        >
          <Text
            style={[
              styles.statNumber,
              {color:colors.primary},
            ]}
          >
            {totalUsers}
          </Text>

          <Text
            style={{
              color:colors.text,
            }}
          >
            Total Users
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            {backgroundColor:colors.card},
          ]}
        >
          <Text
            style={[
              styles.statNumber,
              {color:colors.primary},
            ]}
          >
            {pushEnabledUsers}
          </Text>

          <Text
            style={{
              color:colors.text,
            }}
          >
            Push Enabled
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            {backgroundColor:colors.card},
          ]}
        >
          <Text
            style={[
              styles.statNumber,
              {color:colors.primary},
            ]}
          >
            {activeStreakUsers}
          </Text>

          <Text
            style={{
              color:colors.text,
            }}
          >
            Active Users
          </Text>
        </View>
      </View>

      <TextInput
        placeholder="Search user by email..."
        placeholderTextColor={colors.textSecondary}
        value={search}
        onChangeText={setSearch}
        style={[
          styles.input,
          {
            backgroundColor:colors.card,
            color:colors.text,
            borderColor:colors.border,
          },
        ]}
      />

      <TextInput
        placeholder="Notification Title"
        placeholderTextColor={colors.textSecondary}
        value={title}
        onChangeText={setTitle}
        style={[
          styles.input,
          {
            backgroundColor:colors.card,
            color:colors.text,
            borderColor:colors.border,
          },
        ]}
      />

      <TextInput
        placeholder="Notification Message"
        placeholderTextColor={colors.textSecondary}
        value={body}
        onChangeText={setBody}
        multiline
        style={[
          styles.input,
          {
            backgroundColor:colors.card,
            color:colors.text,
            borderColor:colors.border,
            minHeight: 90,
          },
        ]}
      />

      <Pressable
        style={styles.broadcastButton}
        onPress={sendBroadcast}
      >
        <Text
          style={styles.buttonText}
        >
          Send To All Users
        </Text>
      </Pressable>

      <FlatList
        data={filteredUsers}
        keyExtractor={(
          item: any
        ) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 40,}}
        renderItem={({item}: any) => (
          <View
            style={[
              styles.card,
              {backgroundColor:colors.card},
            ]}
          >
            <Image
              source={{uri:item.avatar}}
              style={styles.avatar}
            />

            <View style={{flex: 1}}>
              <Text
                style={[
                  styles.name,
                  {color:colors.text},
                ]}
              >
                {item.name}
              </Text>

              <Text
                style={[
                  styles.email,
                  {color:colors.textSecondary},
                ]}
              >
                {item.email}
              </Text>

              <Text
                style={{color:colors.primary}}
              >
                🔥 Streak:{" "}
                {item.streak}
              </Text>
            </View>

            <Pressable
              style={styles.notifyButton}
              onPress={() =>sendToUser(item)}
            >
              <Text
                style={styles.buttonText}
              >
                Notify
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default Admin;

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    
    center: {
      flex: 1,
      justifyContent:"center",
      alignItems: "center",
    },

    statsContainer: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 20,
    },

    statCard: {
      flex: 1,
      padding: 16,
      borderRadius: 20,
      alignItems: "center",
      elevation: 2,
    },

    statNumber: {
      fontSize: 26,
      fontWeight: "700",
      marginBottom: 5,
    },

    input: {
      borderWidth: 1,
      borderRadius: 18,
      paddingHorizontal: 18,
      paddingVertical: 14,
      marginBottom: 14,
      fontSize: 16,
    },

    broadcastButton: {
      backgroundColor:"#22c55e",
      paddingVertical: 16,
      borderRadius: 18,
      alignItems: "center",
      marginBottom: 20,
    },

    notifyButton: {
      backgroundColor:"#208AEF",
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 14,
      justifyContent:"center",
      alignItems: "center",
    },

    buttonText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 14,
    },

    card: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      marginBottom: 12,
      borderRadius: 20,
      elevation: 2,
    },

    avatar: {
      width: 55,
      height: 55,
      borderRadius: 28,
      marginRight: 15,
    },

    name: {
      fontSize: 18,
      fontWeight: "700",
    },

    email: {
      marginTop: 4,
      marginBottom: 4,
    },
  });