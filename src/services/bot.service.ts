import { Request, Response } from "express";
import { FuelLevelAlertIncidentEvent } from "../types/webhook2/fuel-level.type";
import { VehicleDefLevelAlertIncidentEvent } from "../types/webhook2/def-level.type";
import { escapeMarkdown } from "../utils/escape-markdown.util";
import { HarshEventAlertIncidentEvent } from "../types/webhook2/harsh-event.type";
import { SevereSpeedingAlertIncidentEvent } from "../types/webhook2/severe-speeding.type";

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

    const message = `🚨⚠️ *Low Fuel Level Alert\\!*  
  
🚚 *Vehicle:* ${escapeMarkdown(vehicle.name)} \\(Serial: ${escapeMarkdown(
      vehicle.serial
    )}\\)  
🛻 *Trailer:* ${escapeMarkdown(trailer.name)} \\(Serial: ${escapeMarkdown(
      trailer.trailerSerialNumber
    )}\\)  
🧑‍✈️ *Driver:* ${escapeMarkdown(driver.name)}  
📉 *Description:* ${escapeMarkdown(condition.description)}  
🕒 *Time:* ${escapeMarkdown(webhookData.data.happenedAtTime)}  
[🔗View Incident](${escapeMarkdown(webhookData.data.incidentUrl)})`;

    return message;
  }

  async sendVehicleDefLevelAlert(
    webhookData: VehicleDefLevelAlertIncidentEvent
  ): Promise<string> {
    const escapeMarkdown = (text: string): string =>
      text.replace(/([_*\[\]()~`>#+=|{}.!\\-])/g, "\\$1");

    const condition = webhookData.data.conditions[0];
    const vehicle = condition.details.vehicleDefLevelPercentage.vehicle;
    const trailer = condition.details.vehicleDefLevelPercentage.trailer;
    const driver = condition.details.vehicleDefLevelPercentage.driver;

    const message = `🚨⚠️ *Low DEF Level Alert\\!*  
  
🚚 *Vehicle:* ${escapeMarkdown(vehicle.name)} \\(Serial: ${escapeMarkdown(
      vehicle.serial
    )}\\)  
🛻 *Trailer:* ${escapeMarkdown(trailer.name)} \\(Serial: ${escapeMarkdown(
      trailer.trailerSerialNumber
    )}\\)  
🧑‍✈️ *Driver:* ${escapeMarkdown(driver.name)}  
📉 *Description:* ${escapeMarkdown(condition.description)}  
🕒 *Time:* ${escapeMarkdown(webhookData.data.happenedAtTime)}  
[🔗View Incident](${escapeMarkdown(webhookData.data.incidentUrl)})`;

    return message;
  }
  async sendHarshEventAlert(
    webhookData: HarshEventAlertIncidentEvent
  ): Promise<string> {
    const condition = webhookData.data.conditions[0];
    const { vehicle, trailer, driver } = condition.details.harshEvent;

    const description = condition.description.toLowerCase();

    // Determine recommendation based on event type
    let recommendation = "Please drive with caution.";
    if (description.includes("brake")) {
      recommendation =
        "Avoid sudden braking unless necessary. Maintain a safe distance.";
    } else if (description.includes("crash")) {
      recommendation =
        "Report the incident immediately. Ensure all parties are safe.";
    } else if (description.includes("distracted")) {
      recommendation =
        "Avoid distractions. Stay focused on the road at all times.";
    } else if (description.includes("acceleration")) {
      recommendation =
        "Accelerate smoothly to avoid cargo shifts or mechanical stress.";
    }

    const message = `🚨⚠️ *Harsh Driving Event Alert\\!*  
  
🚚 *Vehicle:* ${escapeMarkdown(vehicle.name)} \\(Serial: ${escapeMarkdown(
      vehicle.serial
    )}\\)  
🛻 *Trailer:* ${escapeMarkdown(trailer.name)} \\(Serial: ${escapeMarkdown(
      trailer.trailerSerialNumber
    )}\\)  
🧑‍✈️ *Driver:* ${escapeMarkdown(driver.name)}  
📉 *Event:* ${escapeMarkdown(condition.description)}  
🕒 *Time:* ${escapeMarkdown(webhookData.data.happenedAtTime)}  
💡 *Recommendation:* ${escapeMarkdown(recommendation)}  
[🔗View Incident](${escapeMarkdown(webhookData.data.incidentUrl)})`;

    return message;
  }

  async sendSevereSpeedingAlert(
    webhookData: SevereSpeedingAlertIncidentEvent,
    res: Response
  ): Promise<string> {
    const condition = webhookData.data.conditions[0];
    const speeding = condition.details.severeSpeeding;
    const vehicle = speeding.vehicle;

    const message = `🚨⚠️ *Severe Speeding Alert\\!*  
  
🚚 *Vehicle:* ${escapeMarkdown(vehicle.name)}  
🔢 *License Plate:* ${escapeMarkdown(vehicle.licensePlate)}  
🆔 *VIN:* ${escapeMarkdown(vehicle.vehicleVin)}  
🕒 *Start Time:* ${escapeMarkdown(speeding.startTime)}  
🛣️ *Trip Start Time:* ${escapeMarkdown(speeding.tripStartTime)}  
📉 *Description:* ${escapeMarkdown(condition.description)}  
📎 *Recommendation:* Please reduce speed immediately and follow all posted speed limits\\!  
[🔗View Incident](${escapeMarkdown(webhookData.data.incidentUrl)})`;

    return message;
  }
}
export default new SamsaraBotService();
