import { Expo } from "expo-server-sdk";

const expo = new Expo();

export const sendPushNotification = async (
  expoPushToken,
  title,
  body
) => {
  try {
    if (!Expo.isExpoPushToken(expoPushToken)) {
      console.log("Invalid Push Token");

      return;
    }

    const messages = [
      {
        to: expoPushToken,

        sound: "default",

        title,

        body,

        data: {
          type: "streak",
        },
      },
    ];

    const chunks = expo.chunkPushNotifications(messages);

    for (const chunk of chunks) {
      const tickets =
        await expo.sendPushNotificationsAsync(
          chunk
        );

      console.log("Tickets:", tickets);
    }
  } catch (error) {
    console.log(error);
  }
};