import {
  AlertIncidentEvent,
  Driver,
  Trailer,
  Vehicle,
} from "./base-types.type";

interface VehicleDefLevelDetails {
  vehicleDefLevelPercentage: {
    vehicle: Vehicle;
    trailer?: Trailer;
    driver?: Driver;
  };
}

export type VehicleDefLevelIncidentEvent =
  AlertIncidentEvent<VehicleDefLevelDetails>;
