import { useSyncExternalStore } from "react";

// Hand-off between the tap/walk measure screens and the Basic Info form.
// Measure screens sit on top of the form in the stack, so they publish the
// result here and go back — the form (and everything already typed in it)
// stays mounted instead of being rebuilt from route params.

export type MeasuredArea = { kanals: number; marlas: number };

let current: MeasuredArea | null = null;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

export const setMeasuredArea = (area: MeasuredArea | null) => {
  current = area;
  emit();
};

export const useMeasuredArea = () =>
  useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
    () => null,
  );

// kanals/marlas inputs are whole numbers with marlas capped at 19
// (20 marlas = 1 kanal), the same shape the manual entry produces
export const toKanalsAndMarlas = (areaInMarlas: number) => {
  const totalMarlas = Math.max(Math.round(areaInMarlas), 0);
  return {
    kanals: Math.floor(totalMarlas / 20),
    marlas: totalMarlas % 20,
  };
};
