import axios from "axios";

export const weatherInstance = axios.create({
  baseURL: "https://my.meteoblue.com/packages/",
  params: {
    apikey: "SsHj8iQZmnWuNpPB",
    format: "json",
  },
});

export const weatherImageInstance = axios.create({
  baseURL: "https://my.meteoblue.com/images", // Root images path
  params: {
    apikey: "SsHj8iQZmnWuNpPB",
    format: "png",
    dpi: 72,
    temperature_units: "C",
  },
});
