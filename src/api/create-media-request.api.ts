import { CreateMediaRequestDto } from "../dtos/create-media-request.dto";
import baseApi from "./base-api";
import { MediaRetrievalResponse } from "../types/response/media-retrieval.type";

import dotenv from "dotenv";
dotenv.config();

export const createMediaRequest = async (
  body: CreateMediaRequestDto
): Promise<MediaRetrievalResponse | null> => {
  try {
    const response = await baseApi.post<MediaRetrievalResponse>(
      "/cameras/media/retrieval",
      body
    );
    console.log("✅ Media request successful:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error(
        "❌ Media request failed with status:",
        error.response.status
      );
      console.error(
        "📝 Response message:",
        error.response.data?.message || error.message
      );
    } else {
      console.error("❌ Media request failed:", error.message);
    }
    return null;
  }
};
