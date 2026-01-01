import { useEffect, useState } from "react";
import { searchLocation } from "../services/locationService";

export const useLocationSearch = (query: string) => {
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query || query.length < 3) {
            setCoords(null);
            setName(null);
            return;
        }

        const timeout = setTimeout(async () => {
            setLoading(true);

            try {
                const data = await searchLocation(query);

                if (data.length > 0) {
                    setCoords({ lat: data[0].lat, lon: data[0].lon });
                    setName(data[0].name);   // 👈 THIS
                }
            } catch {
                setCoords(null);
                setName(null);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [query]);

    return { coords, name, loading };
};
