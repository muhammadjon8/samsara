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

router.post("/harsh-brake", sendHarshBrakeAlert);
router.post("/fuel", sendFuelLevelAlert);
router.post("/severe-speeding", sendSevereSpeedingAlert);
router.post("/def", sendVehicleDefLevelAlert);
router.post("/acceleration", sendHarshAccelerationAlert);
router.post("/crash", sendCrashAlert);
router.post("/distracted", sendDistractedDrivingAlert);
router.post("/harsh-turn", sendHarshTurnAlert);

export default router;
