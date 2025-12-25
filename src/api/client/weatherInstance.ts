import axios from "axios";

const weatherInstance = axios.create({
  baseURL: "https://api.weatherapi.com/v1/forecast.json/",

  params: {
    key: process.env.WEATHER_API_KEY,
  },

});

export default weatherInstance;
