export type EntityWithTags = {
  id: string;
  externalIds: {
    [key: string]: string;
  };

  name: string;
  tags: Array<{
    id: string;
    name: string;
    parentTagId: string;
  }>;
  attributes: Array<{
    id: string;
    name: string;
  }>;
};
export type BaseAlertIncidentEvent<TConditions> = {
  eventId: string;
  eventTime: string;
  eventType: "AlertIncident";
  orgId: number;
  webhookId: string;
  data: {
    configurationId: string;
    resolvedAtTime: string;
    happenedAtTime: string;
    updatedAtTime: string;
    isResolved: boolean;
    incidentUrl: string;
    conditions: TConditions[];
  };
};

export type Vehicle = EntityWithTags & {
  serial: string;
};

export type Trailer = EntityWithTags & {
  trailerSerialNumber: string;
};

export type Driver = EntityWithTags & {
  externalIds: {
    [key: string]: string;
  };
  attributes: Array<{
    id: string;
    name: string;
    numberValues: number[];
    stringValues: string[];
  }>;
};
