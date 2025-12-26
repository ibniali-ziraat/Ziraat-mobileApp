import { UNITS, UnitKey } from "./units";

export const convertToMarlas = (value: number, unit: UnitKey) => {
  return value * (UNITS.marla.rate / UNITS[unit].rate);
};
