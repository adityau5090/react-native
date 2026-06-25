import User from "../models/User.js";
import { sendPushNotification } from "../services/expoPush.service.js";

export const sendBroadcastNotification = async (req, res) => {
    try {
      const { title, body } = req.body;

      if (!title || !body) {
        return res.status(400).json({
          message: "Title and body required",
        });
      }

      const users = await User.find({});

      for (const user of users) {
        if (!user.expoPushToken) continue;

        await sendPushNotification(
          user.expoPushToken,
          title,
          body
        );
      }

      return res.json({
        success: true,
        message: `Notification sent to ${users.length} users`,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: error.message,
      });
    }
};

export const sendUserNotification =async (req, res) => {
    try {
      const {
        expoPushToken,
        title,
        body,
      } = req.body;

      await sendPushNotification(
        expoPushToken,
        title,
        body
      );

      return res.json({
        success: true,
        message: "Notification sent",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };