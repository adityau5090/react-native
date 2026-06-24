import dotenv from "dotenv"
dotenv.config()

import { App } from "./app.js";
import {connectDB} from "./config/db.js";
import { startCronJobs } from "./services/cron.service.js";

const PORT = process.env.PORT || 5000;
// console.log(process.env.MONGO_URI)

connectDB();
startCronJobs();

App.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});