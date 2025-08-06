import axios from "axios";
import JSZip from "jszip";

export async function fetchAndExtractImages(
  photos: string[],
  accessToken: string | null,
  baseUrl: string
): Promise<Record<string, string>> {
  const imageMap: Record<string, string> = {};
  if (!photos.length || !accessToken) return imageMap;

  try {
    const response = await axios.post(
      `${baseUrl}fileupload/download/ticketattachment/multiple`,
      photos,
      {
        headers: {
          "Content-Type": "application/json",
          AccessToken: accessToken,
        },
        responseType: "arraybuffer", // need arraybuffer to unzip
      }
    );

    const zip = await JSZip.loadAsync(response.data);

    for (const filename in zip.files) {
      const file = zip.files[filename];
      if (!file.dir) {
        const ext = filename.split('.').pop()?.toLowerCase();
        const isImage = ['png', 'jpg', 'jpeg', 'webp'].includes(ext ?? '');
        if (!isImage) continue;

        const blob = await file.async("blob");
        const url = URL.createObjectURL(blob);

        imageMap[filename] = url;
      }
    }

    return imageMap;
  } catch (err) {
    console.error("Failed to fetch or extract images", err);
    return {};
  }
}
