import {
  BaseAlertIncidentEvent,
  Driver,
  Trailer,
  Vehicle,
} from "./base-types.type";

export type FuelLevelConditionDetails = {
  vehicle: Vehicle;
  trailer?: Trailer;
  driver?: Driver;
};

export type FuelLevelCondition = {
  triggerId: number;
  description: string;
  details: {
    fuelLevelPercentage: FuelLevelConditionDetails;
  };
};

export type FuelLevelAlertIncidentEvent =
  BaseAlertIncidentEvent<FuelLevelCondition>;
