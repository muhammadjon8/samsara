import { AlertWrapper } from "./alert-wrapper.type";

type FuelLevelType = {
  alertEventUrl: string;
  alertConditionDescription: string;
  alertConditionId: string;
  details: string;
  device: {
    id: number;
    name: string;
    serial: string;
    vin: string;
  };
  orgId: number;
  resolved: boolean;
  startMs: number;
  summary: string;
};

type FuelLevelAlert = AlertWrapper<FuelLevelType>;
export type { FuelLevelAlert };

