export type SevereSpeedingConditionDetails = {
  startTime: string;
  tripStartTime: string;
  vehicle: {
    id: string;
    name: string;
    licensePlate: string;
    vehicleVin: string;
    externalIds: {
      maintenanceId: string;
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
