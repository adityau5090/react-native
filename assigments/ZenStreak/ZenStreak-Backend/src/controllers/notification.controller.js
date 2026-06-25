import User from "../models/User.js";
import { sendPushNotification } from "../services/expoPush.service.js";
export const registerToken = async (req,res) => {
  try {
    const { name, expoPushToken } = req.body;

    const user = await User.findOneAndUpdate(
      { expoPushToken },

      {
        name,
        expoPushToken,
      },

      {
        upsert: true,
        new: true,
      }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendTestNotification =
  async (req, res) => {
    try {
      const { expoPushToken } = req.body;

      await sendPushNotification(
        expoPushToken,
        "🔥 ZenStreak",
        "Push notifications are working!"
      );

      res.json({
        success: true,
        message: "Notification sent",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


