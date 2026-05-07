import { useState } from "react";

export function useTapMeasurement() {
  const [points, setPoints] = useState([]);

  const addPoint = (coord) => {
    setPoints((prev) => [...prev, coord]);
  };

  const reset = () => setPoints([]);

  return { points, addPoint, reset };
}
