import {
  BaseAlertIncidentEvent,
  Driver,
  Trailer,
  Vehicle,
} from "./base-types.type";

type VehicleSpeedConditionDetails = {
  currentSpeedKilometersPerHour: number;
  minDurationMilliseconds: number;
  operation: "GREATER" | "LESS" | string;
  thresholdSpeedKilometersPerHour: number;
  vehicle: Vehicle;
  trailer: Trailer;
  driver: Driver;
};

type VehicleSpeedCondition = {
  triggerId: number;
  description: string;
  details: {
    speed: VehicleSpeedConditionDetails;
  };
};

export type VehicleSpeedAlertIncidentEvent =
  BaseAlertIncidentEvent<VehicleSpeedCondition>;
