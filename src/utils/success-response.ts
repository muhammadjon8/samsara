import { Response } from "express";

export function sendWebhookSuccessResponse(res: Response): void {
  res.status(200).json({ message: "Webhook received successfully" });
}
