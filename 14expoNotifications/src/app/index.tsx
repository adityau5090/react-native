import { Text, View, StyleSheet, Button } from "react-native";
import * as Notifications from "expo-notifications"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function Index() {

  
  async function scheduleNotification() {
    const permission = await Notifications.requestPermissionsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "My first notification",
        body: "This is the body of the notification",
        subtitle: "From Tamanna",
        priority: Notifications.AndroidNotificationPriority.HIGH,
        sticky: true
      },
      trigger: null,
      });
  }
  return (
    <View style={styles.container}>
      <Button title="Send Notification" onPress={scheduleNotification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
