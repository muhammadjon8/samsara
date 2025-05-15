import { DateTime } from "luxon";
import { getMedia } from "../api/get-media.api";
import { MediaStatus } from "../types/response/media-status.type";

export async function pollMediaAvailability(
  retrievalId: string,
  maxWaitMs = 10 * 60 * 1000,
  intervalMs = 30 * 1000
): Promise<string | null> {
  const deadline = DateTime.now().plus({ milliseconds: maxWaitMs });

  while (DateTime.now() < deadline) {
    const result = await getMedia(retrievalId);
    const media = result.data.media[0];

      console.log(media.urlInfo?.url);
      console.log(media)
    if (media?.status === MediaStatus.Available && media.urlInfo?.url) {
      return media.urlInfo.url;
    }

    await delay(intervalMs);
  }

  console.warn(
    `Media not available within ${maxWaitMs / 1000}s for ${retrievalId}`
  );
  return null;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
