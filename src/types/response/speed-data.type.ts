export interface AssetLocationResponse {
  data: AssetLocationEvent[];
  pagination: {
    endCursor: string;
    hasNextPage: boolean;
  };
}

export interface AssetLocationEvent {
  happenedAtTime: string;
  asset: {
    id: string;
  };
  location: {
    latitude: number;
    longitude: number;
    headingDegrees: number;
    accuracyMeters: number;
    address: {
      streetNumber: string;
      pointOfInterest: string;
      neighborhood: string;
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    geofence: Record<string, unknown>;
  };
  speed: {
    ecuSpeedMetersPerSecond: number;
  };
}
