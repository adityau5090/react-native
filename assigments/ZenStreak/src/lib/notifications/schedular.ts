import * as Notifications from "expo-notifications";
import { getMotivationalMessage } from "./message";
import { Habit } from "@/constants/habit";

export async function scheduleDailyNotification(
  title: string,
  body: string,
  hour: number,
  minute: number,
  habitId: string
) {
  // console.log(hour, minute)
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

export async function scheduleSmartNotification(habit: Habit) {
  const body = getMotivationalMessage(habit);

  return scheduleDailyNotification(
    `${habit.emoji} ${habit.title}`,
    body,
    habit.reminderHour,
    habit.reminderMinute,
    habit.id
  );
}


export async function scheduleIntervalNotifications(
  title: string,
  body: string,
  intervalMinutes: number,
  startHour: number,
  startMinute: number,
  habitId: string
) {
  const ids: string[] = [];

  let currentMinutes =
    startHour * 60 + startMinute;

  while (currentMinutes < 24 * 60) {
    const hour = Math.floor(
      currentMinutes / 60
    );

    const minute =
      (currentMinutes % 60) + 1;
      console.log(minute)

    const id =
      await Notifications.scheduleNotificationAsync(
        {
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
              Notifications
                .SchedulableTriggerInputTypes
                .DAILY,

            hour,
            minute,
          },
        }
      );

    ids.push(id);

    currentMinutes +=
      intervalMinutes;

      console.log(`Scheduled notification at ${hour}:${minute}`
);
  }

  return ids;
}