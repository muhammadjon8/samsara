import { Response } from "express";
import { escapeMarkdown } from "../utils/escape-markdown.util";
import { HarshEventAlertIncidentEvent } from "../types/webhook2/harsh-event.type";
import { FuelLevelIncidentEvent } from "../types/webhook2/fuel-level.type";
import { VehicleDefLevelIncidentEvent } from "../types/webhook2/def-level.type";
import { SevereSpeedingIncidentEvent } from "../types/webhook2/severe-speeding.type";
import { DateTime } from "luxon";
import { metersPerSecondToMph } from "../utils/speed-converted";
import { formatRelativeTime } from "../utils/format-date";
import { getVehicleDetails } from "../api/get-driver";
import { getAssetLocationAndSpeed } from "../api/asset-speed-and-location";

class SamsaraBotService {
  constructor() {}

  async sendFuelLevelAlert(
    webhookData: FuelLevelIncidentEvent,
    res: Response
  ): Promise<string> {
    const driver = webhookData.data.conditions[0].details.fuelLevelPercentage;
    const vehicle = await getVehicleDetails(driver.vehicle.id);
    const incidentUrl = webhookData.data.incidentUrl;

    return (
      `⛽️ Fuel Low Detected ⛽️\n\n` +
      `👤 Driver: ${escapeMarkdown(vehicle.data.name)}\n` +
      `🔻 Fuel low: Less than 10% ${escapeMarkdown("(past 15 minutes)")}\n` +
      `⚠️ Recommend: Please, refuel\n` +
      (incidentUrl
        ? `\n🔗 [View Incident](${escapeMarkdown(incidentUrl)})`
        : "")
    );
  }

  async sendVehicleDefLevelAlert(
    webhookData: VehicleDefLevelIncidentEvent,
    res: Response
  ): Promise<string> {
    const condition =
      webhookData.data.conditions[0].details.vehicleDefLevelPercentage;

    if (!condition.vehicle) {
      throw new Error("DEF level alert missing vehicle data");
    }
    const vehicleId = condition.vehicle.id;
    const vehicle = await getVehicleDetails(vehicleId);
    const incidentUrl = webhookData.data.incidentUrl;

    return (
      `🧪 DEF Low Detected 🧪\n\n` +
      `👤 Driver: ${escapeMarkdown(vehicle.data.name)}\n` +
      `🔻 DEF level: Less than 10% ${escapeMarkdown("(past 15 minutes)")}\n` +
      `⚠️ Recommend: Refill DEF to avoid engine derate\n` +
      (incidentUrl
        ? `\n🔗 [View Incident](${escapeMarkdown(incidentUrl)})`
        : "")
    );
  }

  async sendHarshBrakeAlert(
    webhookData: HarshEventAlertIncidentEvent
  ): Promise<string> {
    const harshEvent = webhookData?.data.conditions[0]?.details?.harshEvent;
    if (!harshEvent || !harshEvent.vehicle) {
      throw new Error("Invalid harsh brake event data");
    }

    const vehicle = harshEvent.vehicle;
    const vehicleRes = await getVehicleDetails(vehicle.id);
    const vehicleName = vehicleRes.data.name;
    const incidentUrl = webhookData.data.incidentUrl;
    const recommendation = `🚛💥 Harsh braking alert! Stay safe by maintaining a safe distance and anticipating traffic changes. Smooth driving keeps you and others secure on the road. 🛣️👍 #SafetyFirst`;

    return (
      `⚠️🛑 Harsh Braking detected\n` +
      `👤 Driver: ${escapeMarkdown(vehicleName)}\n\n` +
      `${escapeMarkdown(recommendation)}\n` +
      `[🔗View Incident](${escapeMarkdown(incidentUrl)})`
    );
  }

  async sendCrashAlert(
    webhookData: HarshEventAlertIncidentEvent
  ): Promise<string> {
    const harshEvent = webhookData?.data.conditions[0]?.details?.harshEvent;
    if (!harshEvent || !harshEvent.vehicle) {
      throw new Error("Invalid crash event data");
    }

    const vehicle = harshEvent.vehicle;
    const vehicleRes = await getVehicleDetails(vehicle.id);
    const vehicleName = vehicleRes.data.name;
    const incidentUrl = webhookData.data.incidentUrl;
    const timestamp = webhookData.eventTime;

    let locationInfo = "";
    const vehicleId = vehicle.id;
    const startTime = timestamp;
    const endTime = DateTime.fromISO(startTime)
      .plus({ seconds: 5 })
      .toUTC()
      .toISO();

    const locationRes = await getAssetLocationAndSpeed(
      startTime,
      endTime,
      vehicleId
    );
    const locationData = locationRes.data[0];

    if (
      locationData &&
      locationData.location &&
      locationData.location.address
    ) {
      const address = locationData.location.address;
      locationInfo = `\n📍 Location: ${escapeMarkdown(
        `${address.street}, ${address.city}, ${address.state}`
      )}`;
    }

    return (
      `🚨 URGENT: POSSIBLE CRASH DETECTED 🚨\n\n` +
      `👤 Driver: ${escapeMarkdown(vehicleName)}\n` +
      `⏰ Time: ${formatRelativeTime(timestamp)}` +
      locationInfo +
      `\n\n⚠️ IMMEDIATE ACTION REQUIRED: Please contact driver to confirm safety and dispatch assistance if needed.\n` +
      `\n[🔗View Incident](${escapeMarkdown(incidentUrl)})`
    );
  }

  async sendDistractedDrivingAlert(
    webhookData: HarshEventAlertIncidentEvent
  ): Promise<string> {
    const harshEvent = webhookData?.data.conditions[0]?.details?.harshEvent;
    if (!harshEvent || !harshEvent.vehicle) {
      throw new Error("Invalid distracted driving event data");
    }

    const vehicle = harshEvent.vehicle;
    const vehicleRes = await getVehicleDetails(vehicle.id);
    const vehicleName = vehicleRes.data.name;
    const incidentUrl = webhookData.data.incidentUrl;

    return (
      escapeMarkdown(
        `⚠️📵👀 Driver Distraction Detected:\n\n` +
          `👤 Driver: ${vehicleName}\n\n` +
          `Road safety always comes first. 📢 You must not engage with your phone or any other distractions. 📵 Such distractions can lead to traffic accidents. Always keep your attention on the road and follow all safety rules. 🛣️\n\n` +
          `Your safety is in first place👷‍♂️🚦`
      ) +
      (incidentUrl
        ? `\n🔗 [View Incident](${escapeMarkdown(incidentUrl)})`
        : "")
    );
  }

  async sendHarshAccelerationAlert(
    webhookData: HarshEventAlertIncidentEvent
  ): Promise<string> {
    const harshEvent = webhookData?.data.conditions[0]?.details?.harshEvent;
    if (!harshEvent || !harshEvent.vehicle) {
      throw new Error("Invalid harsh acceleration event data");
    }

    const vehicle = harshEvent.vehicle;
    const vehicleRes = await getVehicleDetails(vehicle.id);
    const vehicleName = vehicleRes.data.name;
    const incidentUrl = webhookData.data.incidentUrl;
    const timestamp = webhookData.eventTime;

    const recommendation =
      `🚛⚡ Rapid acceleration detected! Smooth, gradual acceleration improves fuel efficiency, ` +
      `reduces wear on vehicle components, and creates a safer driving environment. ` +
      `Please maintain steady, controlled acceleration patterns.`;

    return (
      `⚠️⚡ Harsh Acceleration Alert\n\n` +
      `👤 Driver: ${escapeMarkdown(vehicleName)}\n` +
      `⏰ Time: ${formatRelativeTime(timestamp)}\n\n` +
      `${escapeMarkdown(recommendation)}\n` +
      `[🔗View Incident](${escapeMarkdown(incidentUrl)})`
    );
  }

  async sendSevereSpeedingAlert(
    webhookData: SevereSpeedingIncidentEvent,
    res: Response
  ): Promise<string> {
    const condition = webhookData?.data.conditions?.[0];
    const data = condition?.details?.severeSpeeding?.data;
    if (!data || !data.vehicle || !data.vehicle.id) {
      throw new Error("Invalid severe speeding event data");
    }

    const vehicleId = data.vehicle.id;
    const startTime = data.startTime;

    if (!startTime) {
      throw new Error("Missing start time for severe speeding event");
    }

    const endTime = DateTime.fromISO(startTime)
      .plus({ seconds: 5 })
      .toUTC()
      .toISO();

    const [speedRes, vehicleRes] = await Promise.all([
      getAssetLocationAndSpeed(startTime, endTime, vehicleId),
      getVehicleDetails(vehicleId),
    ]);

    const locationData = speedRes.data[0];
    if (!locationData) throw new Error("No speed data found for vehicle");

    const speedMph = metersPerSecondToMph(
      locationData.speed.ecuSpeedMetersPerSecond
    );

    const vehicleName = vehicleRes.data.name || "Unknown Vehicle";
    const location = locationData.location.address;

    const recommendation =
      "🚛💨 Severe speeding alert! Stay safe by obeying speed limits and driving responsibly. Your safety and the safety of others on the road is our priority. 🛣️👍 #SafetyFirst";

    const formattedAddress =
      `${location?.street}, ${location?.city}, ${location?.state}`.trim();

    const message =
      `🚨 Severe Speeding Alert!\n\n` +
      `👤 Driver: ${escapeMarkdown(vehicleName)}\n` +
      `🏎 Vehicle Speed: ${speedMph.toFixed(1)} mph\n` +
      `⏳ Happened at: ${formatRelativeTime(startTime)}\n` +
      `🔺 Speed: ${`+15 miles over the limit`}\n` +
      `📍 Location: ${formattedAddress}`;

    return (
      escapeMarkdown(message) +
      `\n\n${escapeMarkdown(recommendation)}` +
      `\n[🔗View Incident](${escapeMarkdown(webhookData.data.incidentUrl)})`
    );
  }

  async sendHarshTurnAlert(
    webhookData: HarshEventAlertIncidentEvent
  ): Promise<string> {
    const harshEvent = webhookData?.data.conditions[0]?.details?.harshEvent;
    if (!harshEvent || !harshEvent.vehicle) {
      throw new Error("Invalid harsh turn event data");
    }

    const vehicle = harshEvent.vehicle;
    const vehicleRes = await getVehicleDetails(vehicle.id);
    const vehicleName = vehicleRes.data.name;
    const incidentUrl = webhookData.data.incidentUrl;
    const timestamp = webhookData.eventTime;

    const recommendation =
      `🚛↩️ Harsh turn detected! Taking turns at appropriate speeds improves vehicle stability ` +
      `and reduces risk of rollover or cargo shifting. ` +
      `Please slow down before turns and navigate them smoothly.`;

    return (
      `⚠️↩️ Harsh Turn Alert\n\n` +
      `👤 Driver: ${escapeMarkdown(vehicleName)}\n` +
      `⏰ Time: ${formatRelativeTime(timestamp)}\n\n` +
      `${escapeMarkdown(recommendation)}\n` +
      `[🔗View Incident](${escapeMarkdown(incidentUrl)})`
    );
  }
}

export default new SamsaraBotService();
