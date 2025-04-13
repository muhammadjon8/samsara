import {
  BaseAlertIncidentEvent,
  Driver,
  Trailer,
  Vehicle,
} from "./base-types.type";

export type HarshEventConditionDetails = {
  vehicle: Vehicle;
  trailer: Trailer;
  driver: Driver;
};

export type HarshEventCondition = {
  triggerId: number;
  description: string;
  details: {
    harshEvent: HarshEventConditionDetails;
  };
};

export type HarshEventAlertIncidentEvent =
  BaseAlertIncidentEvent<HarshEventCondition>;
