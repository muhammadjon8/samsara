export type MediaStatusResponse = {
  data: {
    media: Array<{
      status: MediaStatus;
      vehicleId: string;
      input: MediaInput;
      mediaType: MediaType;
      startTime: string;
      endTime: string;
      urlInfo?: {
        url: string;
        urlExpiryTime: string;
      };
      availableAtTime?: string;
    }>;
  };
};

export enum MediaStatus {
  Available = "available",
  Pending = "pending",
  Failed = "failed",
}
export enum MediaInput {
  Driver = "dashcamDriverFacing",
  Road = "dashcamRoadFacing",
}
export enum MediaType {
  Image = "image",
  Video = "videoHighRes",
}
