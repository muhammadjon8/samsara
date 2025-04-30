import { Router } from "express";
import {
  sendCrashAlert,
  sendDistractedDrivingAlert,
  sendFuelLevelAlert,
  sendHarshAccelerationAlert,
  sendHarshBrakeAlert,
  sendHarshTurnAlert,
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
router.post("/harsh-turn", sendHarshTurnAlert);

export default router;
