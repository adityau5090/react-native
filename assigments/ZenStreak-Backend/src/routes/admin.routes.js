import { Router } from "express";
import { sendBroadcastNotification, sendUserNotification } from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";


const router = Router();

router.post("/send-notification",verifyAdmin,sendBroadcastNotification);
router.post("/send-user-notification",verifyAdmin, sendUserNotification);

export default router;