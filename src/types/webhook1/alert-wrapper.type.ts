export type AlertWrapper<T> = {
  eventId: string;
  eventMs: number;
  eventType: "Alert";
  event: T;
};
