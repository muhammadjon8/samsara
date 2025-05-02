import { AlertIncidentEvent } from "./base-types.type";

interface HarshEventDetails {
  harshEvent: {
    vehicle: {
      id: string;
      externalIds?: {
        "samsara.serial": string;
        "samsara.vin": string;
      };
      name?: string;
      serial?: string;
    };
  };
}
export type HarshEventAlertIncidentEvent =
  AlertIncidentEvent<HarshEventDetails>;
