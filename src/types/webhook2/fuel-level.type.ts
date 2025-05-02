import { AlertIncidentEvent } from "./base-types.type";

interface FuelLevelDetails {
  fuelLevelPercentage: {
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
export type FuelLevelIncidentEvent = AlertIncidentEvent<FuelLevelDetails>;