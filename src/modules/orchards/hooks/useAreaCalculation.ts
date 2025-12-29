import { getAreaOfPolygon } from "geolib";

export const useAreaCalculation = (points: any[]) => {
  if (points.length < 3) return 0;

  // geolib returns sqm → convert to hectares
  const areaInHectares = getAreaOfPolygon(points) / 10000;

  return areaInHectares;
};
