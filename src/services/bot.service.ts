import { Request, Response } from "express";
import { FuelLevelAlertIncidentEvent } from "../types/webhook2/fuel-level.type";
import { VehicleDefLevelAlertIncidentEvent } from "../types/webhook2/def-level.type";
import { escapeMarkdown } from "../utils/escape-markdown.util";
import { HarshEventAlertIncidentEvent } from "../types/webhook2/harsh-event.type";
import { SevereSpeedingAlertIncidentEvent } from "../types/webhook2/severe-speeding.type";
import { buildAlertMessage } from "../utils/build-message";

class SamsaraBotService {
  constructor() {}

  async sendFuelLevelAlert(
    webhookData: FuelLevelAlertIncidentEvent,
    res: Response
  ): Promise<string> {
    const condition = webhookData.data.conditions[0];
    const vehicle = condition.details.fuelLevelPercentage.vehicle;
    const trailer = condition.details.fuelLevelPercentage.trailer;
    const driver = condition.details.fuelLevelPercentage.driver;

    return buildAlertMessage(
      vehicle,
      trailer,
      driver,
      condition,
      "Low Fuel Level",
      webhookData.data.happenedAtTime
    );
  }

  async sendVehicleDefLevelAlert(
    webhookData: VehicleDefLevelAlertIncidentEvent
  ): Promise<string> {
    const condition = webhookData.data.conditions[0];
    const vehicle = condition.details.vehicleDefLevelPercentage.vehicle;
    const trailer = condition.details.vehicleDefLevelPercentage.trailer;
    const driver = condition.details.vehicleDefLevelPercentage.driver;

    return buildAlertMessage(
      vehicle,
      trailer,
      driver,
      condition,
      "Low DEF Level",
      webhookData.data.happenedAtTime
    );
  }

  async sendHarshBrakeAlert(
    webhookData: HarshEventAlertIncidentEvent
  ): Promise<string> {
    const condition = webhookData.data.conditions[0];
    const { vehicle, trailer, driver } = condition.details.harshEvent;

    const recommendation =
      "Avoid sudden braking unless necessary. Maintain a safe distance.";

    return buildAlertMessage(
      vehicle,
      trailer,
      driver,
      condition,
      "Harsh Braking Event",
      webhookData.data.happenedAtTime,
      recommendation
    );
  }

  async sendCrashAlert(
    webhookData: HarshEventAlertIncidentEvent
  ): Promise<string> {
    const condition = webhookData.data.conditions[0];
    const { vehicle, trailer, driver } = condition.details.harshEvent;

    const recommendation =
      "Report the incident immediately. Ensure all parties are safe.";

    return buildAlertMessage(
      vehicle,
      trailer,
      driver,
      condition,
      "Crash Event",
      webhookData.data.happenedAtTime,
      recommendation
    );
  }

  async sendDistractedDrivingAlert(
    webhookData: HarshEventAlertIncidentEvent
  ): Promise<string> {
    const condition = webhookData.data.conditions[0];
    const { vehicle, trailer, driver } = condition.details.harshEvent;

    const recommendation =
      "Avoid distractions. Stay focused on the road at all times.";

    return buildAlertMessage(
      vehicle,
      trailer,
      driver,
      condition,
      "Distracted Driving Event",
      webhookData.data.happenedAtTime,
      recommendation
    );
  }

  async sendHarshAccelerationAlert(
    webhookData: HarshEventAlertIncidentEvent
  ): Promise<string> {
    const condition = webhookData.data.conditions[0];
    const { vehicle, trailer, driver } = condition.details.harshEvent;

    const recommendation =
      "Accelerate smoothly to avoid cargo shifts or mechanical stress.";

    return buildAlertMessage(
      vehicle,
      trailer,
      driver,
      condition,
      "Harsh Acceleration Event",
      webhookData.data.happenedAtTime,
      recommendation
    );
  }

  async sendSevereSpeedingAlert(
    webhookData: SevereSpeedingAlertIncidentEvent,
    res: Response
  ): Promise<string> {
    const condition = webhookData.data.conditions[0];
    const speeding = condition.details.severeSpeeding;
    const vehicle = speeding.vehicle;

    const message = `🚨⚠️ *Severe Speeding Alert\\!*  
  
🚚 *Vehicle:* ${escapeMarkdown(vehicle.name ?? "Unknown")}  
🔢 *License Plate:* ${escapeMarkdown(vehicle.licensePlate ?? "Unknown")}  
🆔 *VIN:* ${escapeMarkdown(vehicle.vehicleVin ?? "Unknown")}  
🕒 *Start Time:* ${escapeMarkdown(speeding.startTime)}  
🛣️ *Trip Start Time:* ${escapeMarkdown(speeding.tripStartTime)}  
📉 *Description:* ${escapeMarkdown(condition.description)}  
📎 *Recommendation:* Please reduce speed immediately and follow all posted speed limits\\!  
[🔗View Incident](${escapeMarkdown(webhookData.data.incidentUrl)})`;

    return message;
  }

  async sendHarshTurnAlert(
    webhookData: HarshEventAlertIncidentEvent
  ): Promise<string> {
    const condition = webhookData.data.conditions[0];
    const { vehicle, trailer, driver } = condition.details.harshEvent;

    const recommendation =
      "Take turns more gradually to maintain vehicle and cargo stability.";

    return buildAlertMessage(
      vehicle,
      trailer,
      driver,
      condition,
      "Harsh Turn Event",
      webhookData.data.happenedAtTime,
      recommendation
    );
  }
}

export default new SamsaraBotService();
