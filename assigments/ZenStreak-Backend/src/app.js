import express from "express";
import cors from "cors";

import notificationRoutes from "./routes/notification.routes.js";
import adminRoutes from "./routes/admin.routes.js";



const App = express();

App.use(cors({
  origin: "*",
}));

App.use(express.json());

App.use("/api/notifications", notificationRoutes);
App.use("/api/admin", adminRoutes);
App.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ZenStreak Backend Running 🚀",
  });
});


export { App };