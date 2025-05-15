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
import { createMediaRequest } from "../api/create-media-request.api";
import { MediaInput, MediaType } from "../types/response/media-status.type";
import { pollMediaAvailability } from "../utils/poll-media-availability.util";
import { resolveVehicleName } from "../utils/resolve-driver-name.util";
import { MediaRetrievalResponse } from "../types/response/media-retrieval.type";

class SamsaraBotService {
  constructor() {}

  async sendFuelLevelAlert(
    webhookData: FuelLevelIncidentEvent
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
    webhookData: VehicleDefLevelIncidentEvent
  ): Promise<string> {
    const condition =
      webhookData.data.conditions[0].details.vehicleDefLevelPercentage;

    if (!condition.vehicle) {
      throw new Error("DEF level alert missing vehicle data");
    }
    const vehicleName = await resolveVehicleName(condition.vehicle);

    const incidentUrl = webhookData.data.incidentUrl;

    return (
      `🧪 DEF Low Detected 🧪\n\n` +
      `👤 Driver: ${escapeMarkdown(vehicleName)}\n` +
      `🔻 DEF level: Less than 10% ${escapeMarkdown("(past 15 minutes)")}\n` +
      `⚠️ Recommend: Refill DEF to avoid engine derate\n` +
      (incidentUrl
        ? `\n🔗 [View Incident](${escapeMarkdown(incidentUrl)})`
        : "")
    );
  }

  async sendHarshBrakeAlert(
    webhookData: HarshEventAlertIncidentEvent
  ): Promise<{ message: string; url: string | null }> {
    const harshEvent = webhookData?.data.conditions[0]?.details?.harshEvent;
    if (!harshEvent?.vehicle) throw new Error("Invalid harsh brake event data");

    const vehicleId = harshEvent.vehicle.id;
    const vehicleName = await resolveVehicleName(harshEvent.vehicle);

    const incidentUrl = webhookData.data.incidentUrl;

    const recommendation = `🚛💥 Harsh braking alert! Stay safe by maintaining a safe distance and anticipating traffic changes. Smooth driving keeps you and others secure on the road. 🛣️👍 #SafetyFirst`;

    const happenedAt = DateTime.fromISO(
      webhookData.data.happenedAtTime
    ).toUTC();
    const startTime = happenedAt.minus({ seconds: 10 }).toISO();
    const endTime = happenedAt.plus({ seconds: 5 }).toISO();

    if (!startTime || !endTime) {
      throw new Error("Start Time or EndTime is incorrect");
    }

    let url: string | null = null;

    try {
      const mediaRequestData = await createMediaRequest({
        startTime,
        endTime,
        inputs: [MediaInput.Road],
        mediaType: MediaType.Video,
        vehicleId,
      });

      if (!mediaRequestData) {
        throw new Error("Failed to create media request");
      }
      const retrievalId = mediaRequestData.data.retrievalId;
      url = await pollMediaAvailability(retrievalId);
    } catch (error: any) {
      console.warn(
        "Media unavailable, sending message without video:",
        error.message || error
      );
      url = null;
    }

    const message =
      `⚠️🛑 Harsh Braking detected\n` +
      `👤 Driver: ${escapeMarkdown(vehicleName)}\n\n` +
      `${escapeMarkdown(recommendation)}\n` +
      `[🔗View Incident](${escapeMarkdown(incidentUrl)})`;

    return { message, url };
  }

  async sendCrashAlert(
    webhookData: HarshEventAlertIncidentEvent
  ): Promise<{ message: string; url: string | null }> {
    const harshEvent = webhookData?.data.conditions[0]?.details?.harshEvent;
    if (!harshEvent || !harshEvent.vehicle) {
      throw new Error("Invalid crash event data");
    }

    const vehicle = harshEvent.vehicle;
    const vehicleName = await resolveVehicleName(vehicle);
    const incidentUrl = webhookData.data.incidentUrl;
    const timestamp = webhookData.data.happenedAtTime;

    const happenedAt = DateTime.fromISO(
      webhookData.data.happenedAtTime
    ).toUTC();
    const startTime = happenedAt.minus({ seconds: 10 }).toISO();
    const endTime = happenedAt.plus({ seconds: 5 }).toISO();

    if (!startTime || !endTime) {
      throw new Error("Start Time or EndTime is incorrect");
    }

    const vehicleId = vehicle.id;
    let url: string | null = null;

    try {
      const mediaRequestData = await createMediaRequest({
        startTime,
        endTime,
        inputs: [MediaInput.Road],
        mediaType: MediaType.Video,
        vehicleId,
      });

      if (!mediaRequestData) {
        throw new Error("Failed to create media request");
      }
      const retrievalId = mediaRequestData.data.retrievalId;
      url = await pollMediaAvailability(retrievalId);
    } catch (error: any) {
      console.warn(
        "Media unavailable, sending message without video:",
        error.message || error
      );
      url = null;
    }

    let locationInfo = "";

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
    const message =
      `🚨 URGENT: POSSIBLE CRASH DETECTED 🚨\n\n` +
      `👤 Driver: ${escapeMarkdown(vehicleName)}\n` +
      `⏰ Time: ${escapeMarkdown(formatRelativeTime(timestamp))}` +
      locationInfo +
      escapeMarkdown(
        `\n\n⚠️ IMMEDIATE ACTION REQUIRED: Please contact driver to confirm safety and dispatch assistance if needed.\n`
      ) +
      `\n[🔗View Incident](${escapeMarkdown(incidentUrl)})`;
    return { message, url };
  }

  async sendDistractedDrivingAlert(
    webhookData: HarshEventAlertIncidentEvent
  ): Promise<{ message: string; url: string | null }> {
    const harshEvent = webhookData?.data.conditions[0]?.details?.harshEvent;
    if (!harshEvent || !harshEvent.vehicle) {
      throw new Error("Invalid distracted driving event data");
    }

    const vehicleName = await resolveVehicleName(harshEvent.vehicle);
    const incidentUrl = webhookData.data.incidentUrl;
    const happenedAt = DateTime.fromISO(
      webhookData.data.happenedAtTime
    ).toUTC();
    const startTime = happenedAt.minus({ seconds: 10 }).toISO();
    const endTime = happenedAt.plus({ seconds: 5 }).toISO();

    if (!startTime || !endTime) {
      throw new Error("Start Time or EndTime is incorrect");
    }

    let url: string | null = null;

    try {
      const mediaRequestData = await createMediaRequest({
        startTime,
        endTime,
        inputs: [MediaInput.Road],
        mediaType: MediaType.Video,
        vehicleId: harshEvent.vehicle.id,
      });

      if (!mediaRequestData) {
        throw new Error("Failed to create media request");
      }
      const retrievalId = mediaRequestData.data.retrievalId;
      url = await pollMediaAvailability(retrievalId);
    } catch (error: any) {
      console.warn(
        "Media unavailable, sending message without video:",
        error.message || error
      );
      url = null;
    }

    const message =
      escapeMarkdown(
        `⚠️📵👀 Driver Distraction Detected:\n\n` +
          `👤 Driver: ${vehicleName}\n\n` +
          `Road safety always comes first. 📢 You must not engage with your phone or any other distractions. 📵 Such distractions can lead to traffic accidents. Always keep your attention on the road and follow all safety rules. 🛣️\n\n` +
          `Your safety is in first place👷‍♂️🚦`
      ) +
      (incidentUrl
        ? `\n🔗 [View Incident](${escapeMarkdown(incidentUrl)})`
        : "");
    return { message, url };
  }

  async sendHarshAccelerationAlert(
    webhookData: HarshEventAlertIncidentEvent
  ): Promise<{ message: string; url: string | null }> {
    const harshEvent = webhookData?.data.conditions[0]?.details?.harshEvent;
    if (!harshEvent || !harshEvent.vehicle) {
      throw new Error("Invalid harsh acceleration event data");
    }

    const vehicle = harshEvent.vehicle;
    const vehicleName = await resolveVehicleName(vehicle);
    const incidentUrl = webhookData.data.incidentUrl;
    const timestamp = webhookData.data.happenedAtTime;

    const happenedAt = DateTime.fromISO(
      webhookData.data.happenedAtTime
    ).toUTC();
    const startTime = happenedAt.minus({ seconds: 10 }).toISO();
    const endTime = happenedAt.plus({ seconds: 5 }).toISO();

    if (!startTime || !endTime) {
      throw new Error("Start Time or EndTime is incorrect");
    }

    let url: string | null = null;

    try {
      const mediaRequestData = await createMediaRequest({
        startTime,
        endTime,
        inputs: [MediaInput.Road],
        mediaType: MediaType.Video,
        vehicleId: vehicle.id,
      });

      if (!mediaRequestData) {
        throw new Error("Failed to create media request");
      }
      const retrievalId = mediaRequestData.data.retrievalId;
      url = await pollMediaAvailability(retrievalId);
    } catch (error: any) {
      console.warn(
        "Media unavailable, sending message without video:",
        error.message || error
      );
      url = null;
    }

    const recommendation =
      `🚛⚡ Rapid acceleration detected! Smooth, gradual acceleration improves fuel efficiency, ` +
      `reduces wear on vehicle components, and creates a safer driving environment. ` +
      `Please maintain steady, controlled acceleration patterns.`;

    const message =
      `⚠️⚡ Harsh Acceleration Alert\n\n` +
      `👤 Driver: ${escapeMarkdown(vehicleName)}\n` +
      `⏰ Time: ${escapeMarkdown(formatRelativeTime(timestamp))}\n\n` +
      `${escapeMarkdown(recommendation)}\n` +
      `[🔗View Incident](${escapeMarkdown(incidentUrl)})`;
    return { message, url };
  }

  async sendSevereSpeedingAlert(
    webhookData: SevereSpeedingIncidentEvent
  ): Promise<{ message: string; url: string | null }> {
    const condition = webhookData?.data.conditions?.[0];
    const data = condition?.details?.severeSpeeding?.data;
    if (!data || !data.vehicle || !data.vehicle.id) {
      throw new Error("Invalid severe speeding event data");
    }

    const vehicleId = data.vehicle.id;
    const happenedAt = DateTime.fromISO(
      webhookData.data.happenedAtTime
    ).toUTC();
    const startTime = happenedAt.minus({ seconds: 10 }).toISO();
    const endTime = happenedAt.plus({ seconds: 5 }).toISO();

    if (!startTime || !endTime) {
      throw new Error("Start Time or EndTime is incorrect");
    }

    let url: string | null = null;

    try {
      const mediaRequestData = await createMediaRequest({
        startTime,
        endTime,
        inputs: [MediaInput.Road],
        mediaType: MediaType.Video,
        vehicleId,
      });

      if (!mediaRequestData) {
        throw new Error("Failed to create media request");
      }
      const retrievalId = mediaRequestData.data.retrievalId;
      url = await pollMediaAvailability(retrievalId);
    } catch (error: any) {
      console.warn(
        "Media unavailable, sending message without video:",
        error.message || error
      );
      url = null;
    }

    if (!startTime) {
      throw new Error("Missing start time for severe speeding event");
    }

    const speedRes = await getAssetLocationAndSpeed(
      startTime,
      endTime,
      vehicleId
    );

    const locationData = speedRes.data[0];
    if (!locationData) throw new Error("No speed data found for vehicle");

    const speedMph = metersPerSecondToMph(
      locationData.speed.ecuSpeedMetersPerSecond
    );

    const vehicleName = await resolveVehicleName(data.vehicle);
    const location = locationData.location.address;

    const recommendation =
      "🚛💨 Severe speeding alert! Stay safe by obeying speed limits and driving responsibly. Your safety and the safety of others on the road is our priority. 🛣️👍 #SafetyFirst";

    const formattedAddress =
      `${location?.street}, ${location?.city}, ${location?.state}`.trim();

    const message =
      escapeMarkdown(
        `🚨 Severe Speeding Alert!\n\n` +
          `👤 Driver: ${escapeMarkdown(vehicleName)}\n` +
          `🏎 Vehicle Speed: ${speedMph.toFixed(1)} mph\n` +
          `⏳ Happened at: ${formatRelativeTime(startTime)}\n` +
          `🔺 Speed: ${`+15 miles over the limit`}\n` +
          `📍 Location: ${formattedAddress}`
      ) +
      `\n\n${escapeMarkdown(recommendation)}` +
      `\n[🔗View Incident](${escapeMarkdown(webhookData.data.incidentUrl)})`;

    return { message, url };
  }

  async sendHarshTurnAlert(
    webhookData: HarshEventAlertIncidentEvent
  ): Promise<{ message: string; url: string | null }> {
    const harshEvent = webhookData?.data.conditions[0]?.details?.harshEvent;
    if (!harshEvent || !harshEvent.vehicle) {
      throw new Error("Invalid harsh turn event data");
    }
    const happenedAt = DateTime.fromISO(
      webhookData.data.happenedAtTime
    ).toUTC();
    const startTime = happenedAt.minus({ seconds: 10 }).toISO();
    const endTime = happenedAt.plus({ seconds: 5 }).toISO();

    if (!startTime || !endTime) {
      throw new Error("Start Time or EndTime is incorrect");
    }

    let url: string | null = null;

    try {
      const mediaRequestData = await createMediaRequest({
        startTime,
        endTime,
        inputs: [MediaInput.Road],
        mediaType: MediaType.Video,
        vehicleId: harshEvent.vehicle.id,
      });

      if (!mediaRequestData) {
        throw new Error("Failed to create media request");
      }
      const retrievalId = mediaRequestData.data.retrievalId;
      url = await pollMediaAvailability(retrievalId);
    } catch (error: any) {
      console.warn(
        "Media unavailable, sending message without video:",
        error.message || error
      );
      url = null;
    }

    const vehicleName = await resolveVehicleName(harshEvent.vehicle);
    const incidentUrl = webhookData.data.incidentUrl;
    const timestamp = webhookData.data.happenedAtTime;

    const recommendation =
      `🚛↩️ Harsh turn detected! Taking turns at appropriate speeds improves vehicle stability ` +
      `and reduces risk of rollover or cargo shifting. ` +
      `Please slow down before turns and navigate them smoothly.`;

    const message =
      `⚠️↩️ Harsh Turn Alert\n\n` +
      `👤 Driver: ${escapeMarkdown(vehicleName)}\n` +
      `⏰ Time: ${escapeMarkdown(
        escapeMarkdown(formatRelativeTime(timestamp))
      )}\n\n` +
      `${escapeMarkdown(recommendation)}\n` +
      `[🔗View Incident](${escapeMarkdown(incidentUrl)})`;
    return { message, url };
  }
}

export default new SamsaraBotService();
