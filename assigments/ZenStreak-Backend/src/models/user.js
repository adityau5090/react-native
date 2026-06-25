import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    expoPushToken: {
      type: String,
      required: true,
    },

    completedToday: {
      type: Boolean,
      default: false,
    },
    streak: Number,

    longestStreak: Number,

  lastActiveDate: Date,

  notificationsEnabled: Boolean
  },
  {
    timestamps: true,
  }
);

export default mongoose.model( "User", userSchema);