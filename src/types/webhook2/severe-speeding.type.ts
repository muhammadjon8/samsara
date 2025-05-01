export type SevereSpeedingConditionDetails = {
  startTime: string;
  tripStartTime: string;
  vehicle: {
    id: string;
    name?: string;
    licensePlate?: string;
    vehicleVin?: string;
    externalIds?: {
      [key: string]: string;
    };
  };
};

export type SevereSpeedingCondition = {
  triggerId: number;
  description: string;
  details: {
    severeSpeeding: SevereSpeedingConditionDetails;
  };
};

import { BaseAlertIncidentEvent } from "./base-types.type";

export type SevereSpeedingAlertIncidentEvent =
  BaseAlertIncidentEvent<SevereSpeedingCondition>;
