import { Telegraf } from "telegraf";
import botService from "../services/bot.service";
import { FuelLevelAlert } from "../types/webhook1/low-fuel-level.type";
import { Request, Response } from "express";
import { configDotenv } from "dotenv";
import { FuelLevelAlertIncidentEvent } from "../types/webhook2/fuel-level.type";
import { VehicleDefLevelAlertIncidentEvent } from "../types/webhook2/def-level.type";
import { HarshEventAlertIncidentEvent } from "../types/webhook2/harsh-event.type";
import { SevereSpeedingAlertIncidentEvent } from "../types/webhook2/severe-speeding.type";

configDotenv();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN as string);
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export const sendFuelLevelAlert = async (req: Request, res: Response) => {
  try {
    const webhookData = req.body as FuelLevelAlertIncidentEvent;
    const message = await botService.sendFuelLevelAlert(webhookData, res);
    await bot.telegram.sendMessage(CHAT_ID!, message, {
      parse_mode: "MarkdownV2",
    });
    res.status(200).json({ success: true, message: "Fuel Level Alert sent successfully" });
  } catch (error) {
    console.error("Error sending fuel level alert:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const sendVehicleDefLevelAlert = async (req: Request, res: Response) => {
  try {
    const webhookData = req.body as VehicleDefLevelAlertIncidentEvent;
    const message = await botService.sendVehicleDefLevelAlert(webhookData);
    await bot.telegram.sendMessage(CHAT_ID!, message, {
      parse_mode: "MarkdownV2",
    });
    res
      .status(200)
      .json({ success: true, message: "DEF alert sent successfully" });
  } catch (error) {
    console.error("Error sending DEF level alert:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const sendHarshEventAlert = async (req: Request, res: Response) => {
  try {
    const webhookData = req.body as HarshEventAlertIncidentEvent;
    const message = await botService.sendHarshEventAlert(webhookData);
    await bot.telegram.sendMessage(CHAT_ID!, message, {
      parse_mode: "MarkdownV2",
    });
    res
      .status(200)
      .json({ success: true, message: "Harsh event alert sent successfully" });
  } catch (error) {
    console.error("Error sending harsh event alert:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const sendSevereSpeedingAlert = async (req: Request, res: Response) => {
  try {
    const webhookData = req.body as SevereSpeedingAlertIncidentEvent;
    const message = await botService.sendSevereSpeedingAlert(webhookData, res);
    await bot.telegram.sendMessage(CHAT_ID!, message, {
      parse_mode: "MarkdownV2",
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Severe Speeding Alert sent successfully",
      });
  } catch (error) {
    console.error("Error sending severe speeding alert:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};