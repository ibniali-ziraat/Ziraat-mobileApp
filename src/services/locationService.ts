import axios from "axios";

const locationInstance = axios.create({
    baseURL: "https://nominatim.openstreetmap.org",
    headers: {
        "User-Agent": "ziraat-app",
    },
});

export const searchLocation = async (query: string) => {
    if (!query) return [];

    const { data } = await locationInstance.get("/search", {
        params: {
            q: query,
            format: "json",
            limit: 1,
        },
    });

    if (!data || data.length === 0) return [];

    return data.map((item: any) => ({
        name: item.display_name,
        lat: Number(item.lat),
        lon: Number(item.lon),
    }));
};