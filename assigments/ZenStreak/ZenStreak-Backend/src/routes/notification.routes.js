import express from "express";

import {registerToken, sendTestNotification} from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/register", registerToken);
router.post("/send-test", sendTestNotification);

export default router;