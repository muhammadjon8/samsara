import { MediaStatusResponse } from "../types/response/media-status.type";
import baseApi from "./base-api";
import dotenv from "dotenv";

dotenv.config();

export const getMedia = async (
  retrievalId: string
): Promise<MediaStatusResponse> => {
  const result = await baseApi.get(`/cameras/media/retrieval`, {
    params: {
      retrievalId,
    },
  });
  return result.data;
};
