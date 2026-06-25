import cron from "node-cron";
import User from "../models/User.js";
import { sendPushNotification } from "./expoPush.service.js";

export const startCronJobs = () => {
  console.log("Cron Jobs Started 🚀");

  // Runs every day at 8 PM
  cron.schedule("0 20 * * *", async () => {
    console.log("Running Daily Streak Nudge Job");

    try {
      const users = await User.find({
        completedToday: false,
      });

      console.log(
        `Found ${users.length} inactive users`
      );

      for (const user of users) {
        await sendPushNotification(
          user.expoPushToken,
          "🔥 Don't Break Your Streak!",
          "You still have habits left today. Complete them before midnight."
        );
      }

      console.log("Notifications Sent Successfully");
    } catch (error) {
      console.log(error);
    }
  },
  {
    timezone: "Asia/Kolkata"
  }
);

  cron.schedule("0 0 * * *", async () => {
  console.log("Resetting Daily Progress");

  try {
    await User.updateMany(
      {},
      {
        completedToday: false,
      }
    );

    console.log("Daily Progress Reset");
  } catch (error) {
    console.log(error);
  }
},
{timezone: "Asia/Kolkata"}
);
};