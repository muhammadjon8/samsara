import {
  BaseAlertIncidentEvent,
  Driver,
  Trailer,
  Vehicle,
} from "./base-types.type";

export type VehicleDefLevelConditionDetails = {
  vehicle: Vehicle;
  trailer: Trailer;
  driver: Driver;
};

export type VehicleDefLevelCondition = {
  triggerId: number;
  description: string;
  details: {
    vehicleDefLevelPercentage: VehicleDefLevelConditionDetails;
  };
};

export type VehicleDefLevelAlertIncidentEvent =
  BaseAlertIncidentEvent<VehicleDefLevelCondition>;
