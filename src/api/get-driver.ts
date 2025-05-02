import { VehicleDetailResponse } from "../types/response/vehicle-detail.type";
import baseApi from "./base-api";

import dotenv from "dotenv";
dotenv.config();

export const getVehicleDetails = async (
  vehicleId: string
): Promise<VehicleDetailResponse> => {
  const driverData = await baseApi.get(`/fleet/vehicles/${vehicleId}`);
  return driverData.data;
};
