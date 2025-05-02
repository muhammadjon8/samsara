export type VehicleDetailResponse = {
  data: VehicleDetail;
};

export interface VehicleDetail {
  id: string;
  name: string;
  vin: string;
  esn: string;
  serial: string;
  cameraSerial: string;
  make: string;
  model: string;
  year: string;
  harshAccelerationSettingType: "automatic" | "manual" | string;
  notes: string;
  externalIds: {
    [key: string]: string;
  };
  gateway: {
    serial: string;
    model: string;
  };
  vehicleRegulationMode: "regulated" | "unregulated" | string;
}
