export type AlertIncidentEvent<TDetails> = {
  eventId: string;
  eventTime: string;
  eventType: "AlertIncident";
  orgId: number;
  webhookId: string;
  data: {
    configurationId: string;
    updatedAtTime: string;
    happenedAtTime: string;
    isResolved: boolean;
    incidentUrl: string;
    conditions: Array<{
      triggerId: number;
      description: string;
      details: TDetails;
    }>;
  };
};

export interface Vehicle {
  id: string;
  externalIds?: {
    "samsara.serial"?: string;
    "samsara.vin"?: string;
    maintenanceId?: string;
  };
  name?: string;
  serial?: string;
  tags?: Array<{
    id: string;
    name: string;
    parentTagId?: string;
  }>;
  attributes?: Array<{
    id: string;
    name: string;
  }>;
}

export interface Trailer {
  id: string;
  externalIds?: {
    maintenanceId?: string;
  };
  name?: string;
  trailerSerialNumber?: string;
  tags?: Array<{
    id: string;
    name: string;
    parentTagId?: string;
  }>;
  attributes?: Array<{
    id: string;
    name: string;
  }>;
}

export interface Driver {
  id: string;
  externalIds?: {
    payrollId?: string;
  };
  name?: string;
  tags?: Array<{
    id: string;
    name: string;
    parentTagId?: string;
  }>;
  attributes?: Array<{
    id: string;
    name: string;
    numberValues?: number[];
    stringValues?: string[];
  }>;
}