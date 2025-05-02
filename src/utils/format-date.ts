import { DateTime } from "luxon";

export function formatRelativeTime(isoDate: string): string {
  const eventTime = DateTime.fromISO(isoDate).toUTC();
  const now = DateTime.utc();

  const diffInMinutes = now.diff(eventTime, "minutes").minutes;

  if (diffInMinutes < 1) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)} minute(s) ago`;
  }

  const diffInHours = now.diff(eventTime, "hours").hours;
  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hour(s) ago`;
  }

  const diffInDays = now.diff(eventTime, "days").days;
  return `${Math.floor(diffInDays)} day(s) ago`;
}
