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

export const reverseGeocode = async (
    lat: number,
    lon: number,
): Promise<string | null> => {
    try {
        const { data } = await locationInstance.get("/reverse", {
            params: { lat, lon, format: "json" },
        });
        return data?.display_name ?? null;
    } catch {
        return null;
    }
};