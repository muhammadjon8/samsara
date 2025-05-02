import { AssetLocationResponse } from "../types/response/speed-data.type";
import baseApi from "./base-api";

export const getAssetLocationAndSpeed = async (
  startTime: string,
  endTime: string | null,
  vehicleId: string
): Promise<AssetLocationResponse> => {
  const response = await baseApi.get(`/assets/location-and-speed/stream`, {
    params: {
      limit: 1,
      startTime,
      endTime: endTime || undefined,
      ids: vehicleId,
      includeSpeed: true,
      includeReverseGeo: true,
    },
  });
  return response.data;
};
