import { Router } from "express";
import {
  sendCrashAlert,
  sendDistractedDrivingAlert,
  sendFuelLevelAlert,
  sendHarshAccelerationAlert,
  sendHarshBrakeAlert,
  sendSevereSpeedingAlert,
  sendVehicleDefLevelAlert,
} from "../controllers/bot.controller";

const router = Router();

router.post("/fuel", sendFuelLevelAlert);
router.post("/def", sendVehicleDefLevelAlert);
router.post("/brake", sendHarshBrakeAlert);
router.post("/acceleration", sendHarshAccelerationAlert);
router.post("/crash", sendCrashAlert);
router.post("/severe-speeding", sendSevereSpeedingAlert);
router.post("/distracted", sendDistractedDrivingAlert);

export default router;
