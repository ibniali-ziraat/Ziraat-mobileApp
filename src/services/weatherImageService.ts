// weatherImageService.ts
import { Buffer } from "buffer";
import { weatherImageInstance } from "../api/client/weatherInstance";

export const fetchWeatherImage = async ({
  lat,
  lon,
  locationName = "Srinagar",
}) => {
  const response = await weatherImageInstance.get("/meteogram", {
    params: {
      lat,
      lon,
      asl: 1589, // Ideally fetch this from a geo API or pass as param
      tz: "Asia/Kolkata",
      location_name: locationName,
    },
    responseType: "arraybuffer",
  });

  // 🔑 Convert Binary ArrayBuffer to Base64 String
  const base64 = Buffer.from(response.data, "binary").toString("base64");
  return `data:image/png;base64,${base64}`;
};
