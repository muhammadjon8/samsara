import { AlertIncidentEvent } from "./base-types.type";

interface SevereSpeedingDetails {
  severeSpeeding: {
    data: {
      tripStartTime: string;
      startTime: string;
      vehicle: {
        id: string;
      };
    };
  };
}

export type SevereSpeedingIncidentEvent =
  AlertIncidentEvent<SevereSpeedingDetails>;
