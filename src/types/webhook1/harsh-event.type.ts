import { AlertWrapper } from "./alert-wrapper.type";

type DeviceInfo = {
  id: number;
  name: string;
  serial: string;
  vin: string;
};

type HarshEventType = {
  alertEventUrl: string;
  alertConditionDescription: string;
  alertConditionId: string;
  details: string;
  device: DeviceInfo;
  orgId: number;
  resolved: boolean;
  startMs: number;
  summary: string;
};

export type HarshEventAlert = AlertWrapper<HarshEventType>;
