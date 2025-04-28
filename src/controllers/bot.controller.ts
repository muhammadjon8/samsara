import { Telegraf } from "telegraf";
import botService from "../services/bot.service";
import { FuelLevelAlertIncidentEvent } from "../types/webhook2/fuel-level.type";
import { VehicleDefLevelAlertIncidentEvent } from "../types/webhook2/def-level.type";
import { HarshEventAlertIncidentEvent } from "../types/webhook2/harsh-event.type";
import { SevereSpeedingAlertIncidentEvent } from "../types/webhook2/severe-speeding.type";
import { Request, Response } from "express";
import { configDotenv } from "dotenv";

configDotenv();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN as string);
const CHAT_ID = process.env.TELEGRAM_CHAT_ID as string;

export const sendFuelLevelAlert = async (req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: "Fuel Level Webhook received" });

  try {
    console.log(
      "Incoming Fuel Level Alert:",
      JSON.stringify(req.body, null, 2)
    );
    const webhookData = req.body as FuelLevelAlertIncidentEvent;
    const message = await botService.sendFuelLevelAlert(webhookData, res);
    await bot.telegram.sendMessage(CHAT_ID, message, {
      parse_mode: "MarkdownV2",
    });
    console.log("✅ Fuel Level Alert sent to Telegram");
  } catch (error) {
    console.error("❌ Error sending Fuel Level Alert:", error);
  }
};

export const sendVehicleDefLevelAlert = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "DEF Webhook received" });

  try {
    console.log("Incoming DEF Level Alert:", JSON.stringify(req.body, null, 2));
    const webhookData = req.body as VehicleDefLevelAlertIncidentEvent;
    const message = await botService.sendVehicleDefLevelAlert(webhookData);
    await bot.telegram.sendMessage(CHAT_ID, message, {
      parse_mode: "MarkdownV2",
    });
    console.log("✅ DEF Level Alert sent to Telegram");
  } catch (error) {
    console.error("❌ Error sending DEF Level Alert:", error);
  }
};

export const sendHarshEventAlert = async (req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: "Harsh Event Webhook received" });

  try {
    console.log(
      "Incoming Harsh Event Alert:",
      JSON.stringify(req.body, null, 2)
    );
    const webhookData = req.body as HarshEventAlertIncidentEvent;
    const message = await botService.sendHarshEventAlert(webhookData);
    await bot.telegram.sendMessage(CHAT_ID, message, {
      parse_mode: "MarkdownV2",
    });
    console.log("✅ Harsh Event Alert sent to Telegram");
  } catch (error) {
    console.error("❌ Error sending Harsh Event Alert:", error);
  }
};

export const sendSevereSpeedingAlert = async (req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: "Severe Speeding Webhook received" });

  try {
    console.log(
      "Incoming Severe Speeding Alert:",
      JSON.stringify(req.body, null, 2)
    );
    const webhookData = req.body as SevereSpeedingAlertIncidentEvent;
    const message = await botService.sendSevereSpeedingAlert(webhookData, res);
    await bot.telegram.sendMessage(CHAT_ID, message, {
      parse_mode: "MarkdownV2",
    });
    console.log("✅ Severe Speeding Alert sent to Telegram");
  } catch (error) {
    console.error("❌ Error sending Severe Speeding Alert:", error);
  }
};
