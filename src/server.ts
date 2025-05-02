import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";
import {
  sendCrashAlert,
  sendDistractedDrivingAlert,
  sendFuelLevelAlert,
  sendHarshAccelerationAlert,
  sendHarshBrakeAlert,
  sendHarshTurnAlert,
  sendSevereSpeedingAlert,
  sendVehicleDefLevelAlert,
} from "./controllers/bot.controller";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/harsh-brake", sendHarshBrakeAlert);
app.post("/fuel", sendFuelLevelAlert);
app.post("/severe-speeding", sendSevereSpeedingAlert);
app.post("/def", sendVehicleDefLevelAlert);
app.post("/acceleration", sendHarshAccelerationAlert);
app.post("/crash", sendCrashAlert);
app.post("/distracted", sendDistractedDrivingAlert);
app.post("/harsh-turn", sendHarshTurnAlert);
app.get("/", (req, res) => {
  res.send(
    '<h1 style="color:green; text-align:center; margin-top: 300px">Welcome!<br> The Url is working</h1>'
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
