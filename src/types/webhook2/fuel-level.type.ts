import { BaseAlertIncidentEvent, Driver, Trailer, Vehicle } from "./base-types.type";

type FuelLevelConditionDetails = {
  vehicle: Vehicle;
  trailer: Trailer;
  driver: Driver;
};

type FuelLevelCondition = {
  triggerId: number;
  description: string;
  details: {
    fuelLevelPercentage: FuelLevelConditionDetails;
  };
};

export type FuelLevelAlertIncidentEvent =
  BaseAlertIncidentEvent<FuelLevelCondition>;
