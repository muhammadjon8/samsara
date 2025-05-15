import { MediaInput, MediaType } from "../types/response/media-status.type";

export type CreateMediaRequestDto = {
  startTime: string;
  endTime: string;
  inputs: Array<MediaInput>;
  vehicleId: string;
  mediaType: MediaType;
};
