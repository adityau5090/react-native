import { Router } from "express";
import { sendBroadcastNotification } from "../controllers/admin.controller.js";

const router = Router();

router.post("/send-notification",sendBroadcastNotification);

export default router;