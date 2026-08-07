import { useEffect, useState } from "react";
import { searchLocation } from "../services/locationService";

export const useLocationSearch = (query: string) => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;

    if (!query || query.length < 3) {
      setCoords(null);
      setName(null);
      setLoading(false);
      setNotFound(false);
      return;
    }

    setNotFound(false);

    const timeout = setTimeout(async () => {
      setLoading(true);
      setNotFound(false);

      try {
        const data = await searchLocation(query);
        if (!active) return;

        if (data.length > 0) {
          setCoords({ lat: data[0].lat, lon: data[0].lon });
          setName(data[0].name);
        } else {
          setCoords(null);
          setName(null);
          setNotFound(true);
        }
      } catch {
        if (!active) return;
        setCoords(null);
        setName(null);
        setNotFound(true);
      } finally {
        if (active) setLoading(false);
      }
    }, 500);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [query]);

  return { coords, name, loading, notFound };
};
