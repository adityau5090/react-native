import { useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldSetBadge: false,
  }),
});

const Analytics = () => {
  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } =
        await Notifications.requestPermissionsAsync();

      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Please enable notifications in settings."
      );

      return;
    }

    console.log("Notification Permission Granted ✅");
  };

  const sendNotification = async () => {
    try {
      const id =
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "🔥 ZenStreak",
            body: "Time to build your streak!",

            data: {
              screen: "habit",
            },
          },

          trigger: {
            type:
              Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,

            seconds: 5,
          },
        });

      console.log("Scheduled ID:", id);

      Alert.alert(
        "Success",
        "Notification scheduled for 5 seconds."
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        JSON.stringify(error)
      );
    }
  };

  const getScheduled = async () => {
    const notifications =
      await Notifications.getAllScheduledNotificationsAsync();

    console.log(
      "Scheduled Notifications:",
      notifications
    );

    Alert.alert(
      "Check Metro Logs",
      `Found ${notifications.length} notifications`
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Notification Test
      </Text>

      <Pressable
        style={styles.button}
        onPress={sendNotification}
      >
        <Text style={styles.buttonText}>
          Send Test Notification
        </Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={getScheduled}
      >
        <Text style={styles.buttonText}>
          Check Scheduled Notifications
        </Text>
      </Pressable>
    </View>
  );
}

export default Analytics

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    padding: 20,
  },

  title: {
    fontSize: 28,

    fontWeight: "bold",

    textAlign: "center",

    marginBottom: 40,
  },

  button: {
    backgroundColor: "#6C63FF",

    padding: 18,

    borderRadius: 20,

    alignItems: "center",

    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",

    fontSize: 18,

    fontWeight: "600",
  },
});
// After adding this