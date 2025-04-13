import { Router } from "express";
import {
  sendFuelLevelAlert,
  sendHarshEventAlert,
  sendVehicleDefLevelAlert,
} from "../controllers/bot.controller";

const router = Router();

router.post("/fuel", sendFuelLevelAlert);
router.post("/def", sendVehicleDefLevelAlert);
router.post("/harsh", sendHarshEventAlert);

export default router;
