import { create } from "axios";

const locationInstance = create({
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

export type ReverseGeocodeDetails = {
    displayName: string | null;
    district: string | null;
    tehsil: string | null;
    postcode: string | null;
};

export const reverseGeocodeDetails = async (
    lat: number,
    lon: number,
): Promise<ReverseGeocodeDetails | null> => {
    try {
        const { data } = await locationInstance.get("/reverse", {
            params: {
                lat,
                lon,
                format: "json",
                addressdetails: 1,
            },
        });
        const address = data?.address ?? {};

        return {
            displayName: data?.display_name ?? null,
            district:
                address.state_district ??
                address.county ??
                address.city_district ??
                null,
            tehsil:
                address.subdistrict ??
                address.municipality ??
                address.town ??
                address.city ??
                address.village ??
                null,
            postcode: address.postcode ?? null,
        };
    } catch {
        return null;
    }
};
