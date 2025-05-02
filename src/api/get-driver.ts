import dotenv from "dotenv";
import { VehicleDetailResponse } from "../types/response/vehicle-detail.type";
import baseApi from "./base-api";

dotenv.config();

export const getVehicleDetails = async (
  vehicleId: string
): Promise<VehicleDetailResponse> => {
  const driverData = await baseApi.get(`/fleet/vehicles/${vehicleId}`);
  return driverData.data;
};
