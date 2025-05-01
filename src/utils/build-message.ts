import { escapeMarkdown } from "./escape-markdown.util";

export const buildAlertMessage = (
  vehicle: any,
  trailer: any,
  driver: any,
  condition: any,
  description: string,
  eventTime: string,
  recommendation?: string
): string => {
  const trailerText = trailer
    ? `🛻 *Trailer:* ${escapeMarkdown(
        trailer.name
      )} \\(Serial: ${escapeMarkdown(trailer.trailerSerialNumber)}\\)\n`
    : "";

  const driverText = driver
    ? `🧑‍✈️ *Driver:* ${escapeMarkdown(driver.name)}\n`
    : "";

  const recommendationText = recommendation
    ? `💡 *Recommendation:* ${escapeMarkdown(recommendation)}\n`
    : "";

  return `🚨⚠️ *${description} Alert\\!*\n\n🚚 *Vehicle:* ${escapeMarkdown(
    vehicle.name
  )} \\(Serial: ${escapeMarkdown(
    vehicle.serial
  )}\\)\n${trailerText}${driverText}📉 *Event:* ${escapeMarkdown(
    condition.description
  )}\n🕒 *Time:* ${escapeMarkdown(
    eventTime
  )}\n${recommendationText}[🔗View Incident](${escapeMarkdown(
    condition.incidentUrl
  )})`;
};
