import axios from "axios";

export const weatherImageInstance = axios.create({
  baseURL: "https://my.meteoblue.com/images", // Root images path
  params: {
    apikey: "VDmrkMgCeSq937xu",
    format: "png",
    dpi: 72,
    temperature_units: "C",
  },
});
