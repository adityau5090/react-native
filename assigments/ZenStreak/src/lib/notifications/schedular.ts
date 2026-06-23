import * as Notifications from "expo-notifications";

export async function scheduleDailyNotification(
  title: string,
  body: string,
  hour: number,
  minute: number,
  habitId: string
) {
  console.log(hour, minute)
  const notificationId = await Notifications.scheduleNotificationAsync(
    {content: {title,body, data: {type: "habit", habitId}},

    trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute}
    });

  return notificationId;
}

export async function scheduleWeeklyNotification(
  title: string,
  body: string,
  weekdays: number[],
  hour: number,
  minute: number,
  habitId: string
) {
  const ids: string[] = [];

  for (const weekday of weekdays) {
    const id =
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,

          data: {
            type: "habit",
            habitId,
          },
        },

        trigger: {
          type:
            Notifications.SchedulableTriggerInputTypes.WEEKLY,

          weekday: weekday + 1,

          hour,
          minute,
        },
      });

    ids.push(id);
  }

  return ids;
}

export async function cancelNotifications(
  ids: string[]
) {
  for (const id of ids) {
    await Notifications.cancelScheduledNotificationAsync(
      id
    );
  }
}