import { Telegraf } from "telegraf";
import botService from "../services/bot.service";
import { HarshEventAlertIncidentEvent } from "../types/webhook2/harsh-event.type";
import { Request, Response } from "express";
import { configDotenv } from "dotenv";
import { FuelLevelIncidentEvent } from "../types/webhook2/fuel-level.type";
import { VehicleDefLevelIncidentEvent } from "../types/webhook2/def-level.type";
import { SevereSpeedingIncidentEvent } from "../types/webhook2/severe-speeding.type";

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
    const webhookData = req.body as FuelLevelIncidentEvent;
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
    const webhookData = req.body as VehicleDefLevelIncidentEvent;
    const message = await botService.sendVehicleDefLevelAlert(webhookData, res);
    await bot.telegram.sendMessage(CHAT_ID, message, {
      parse_mode: "MarkdownV2",
    });
    console.log("✅ DEF Level Alert sent to Telegram");
  } catch (error) {
    console.error("❌ Error sending DEF Level Alert:", error);
  }
};

export const sendHarshBrakeAlert = async (req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: "Harsh Brake Event Webhook received" });

  try {
    console.log(
      "Incoming Harsh Brake Alert:",
      JSON.stringify(req.body, null, 2)
    );
    const webhookData = req.body as HarshEventAlertIncidentEvent;
    const message = await botService.sendHarshBrakeAlert(webhookData);
    await bot.telegram.sendMessage(CHAT_ID, message, {
      parse_mode: "MarkdownV2",
    });
    console.log("✅ Harsh Brake Alert sent to Telegram");
  } catch (error) {
    console.error("❌ Error sending Harsh Brake Alert:", error);
  }
};

export const sendCrashAlert = async (req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: "Crash Event Webhook received" });

  try {
    console.log("Incoming Crash Alert:", JSON.stringify(req.body, null, 2));

    const webhookData = req.body as HarshEventAlertIncidentEvent;
    const message = await botService.sendCrashAlert(webhookData);
    await bot.telegram.sendMessage(CHAT_ID, message, {
      parse_mode: "MarkdownV2",
    });
    console.log("✅ Crash Alert sent to Telegram");
  } catch (error) {
    console.error("❌ Error sending Crash Alert:", error);
  }
};

export const sendDistractedDrivingAlert = async (
  req: Request,
  res: Response
) => {
  res.status(200).json({
    success: true,
    message: "Distracted Driving Event Webhook received",
  });

  try {
    console.log(
      "Incoming Distracted Driving Alert:",
      JSON.stringify(req.body, null, 2)
    );
    const webhookData = req.body as HarshEventAlertIncidentEvent;
    const message = await botService.sendDistractedDrivingAlert(webhookData);
    await bot.telegram.sendMessage(CHAT_ID, message, {
      parse_mode: "MarkdownV2",
    });
    console.log("✅ Distracted Driving Alert sent to Telegram");
  } catch (error) {
    console.error("❌ Error sending Distracted Driving Alert:", error);
  }
};

export const sendHarshAccelerationAlert = async (
  req: Request,
  res: Response
) => {
  res.status(200).json({
    success: true,
    message: "Harsh Acceleration Event Webhook received",
  });

  try {
    console.log(
      "Incoming Harsh Acceleration Alert:",
      JSON.stringify(req.body, null, 2)
    );
    const webhookData = req.body as HarshEventAlertIncidentEvent;
    const message = await botService.sendHarshAccelerationAlert(webhookData);
    await bot.telegram.sendMessage(CHAT_ID, message, {
      parse_mode: "MarkdownV2",
    });
    console.log("✅ Harsh Acceleration Alert sent to Telegram");
  } catch (error) {
    console.error("❌ Error sending Harsh Acceleration Alert:", error);
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
    const webhookData = req.body as SevereSpeedingIncidentEvent;
    const message = await botService.sendSevereSpeedingAlert(webhookData, res);
    await bot.telegram.sendMessage(CHAT_ID, message, {
      parse_mode: "MarkdownV2",
    });
    console.log("✅ Severe Speeding Alert sent to Telegram");
  } catch (error) {
    console.error("❌ Error sending Severe Speeding Alert:", error);
  }
};

export const sendHarshTurnAlert = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Harsh Turn Event Webhook received",
  });

  try {
    console.log(
      "Incoming Harsh Turn Alert:",
      JSON.stringify(req.body, null, 2)
    );

    const webhookData = req.body as HarshEventAlertIncidentEvent;
    const message = await botService.sendHarshTurnAlert(webhookData);

    await bot.telegram.sendMessage(CHAT_ID, message, {
      parse_mode: "MarkdownV2",
    });

    console.log("✅ Harsh Turn Alert sent to Telegram");
  } catch (error) {
    console.error("❌ Error sending Harsh Turn Alert:", error);
  }
};
