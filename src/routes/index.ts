import { Router } from "express";
import {
  sendFuelLevelAlert,
  sendHarshEventAlert,
  sendSevereSpeedingAlert,
  sendVehicleDefLevelAlert,
} from "../controllers/bot.controller";

const router = Router();

router.post("/fuel", sendFuelLevelAlert);
router.post("/def", sendVehicleDefLevelAlert);
router.post("/harsh", sendHarshEventAlert);
router.post("/severe-speeding", sendSevereSpeedingAlert);

export default router;
