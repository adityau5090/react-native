import * as Notifications from "expo-notifications";
import { router } from "expo-router";

export function setupNotificationListeners() {
  Notifications.addNotificationResponseReceivedListener(
    (response) => {
      const data =
        response.notification.request.content.data;

      if (
        data?.type === "habit" &&
        data.habitId
      ) {
        router.push("/"
        //   `/habit/${data.habitId}`
        );
      }
    }
  );
}