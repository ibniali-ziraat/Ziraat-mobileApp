// StepF_FarmInfrastructure.schema.ts
import { countValidator, multiSelectRequired } from "@/src/lib/validation";
import { z } from "zod";

export const equipmentOptions = [
  "Tractor",
  "Sprayer",
  "Grading Line",
  "Power Weeder",
  "Weather Station",
  "Sensors",
  "Rotavator",
  "Plough",
  "Other",
] as const;

export const storageOptions = [
  "Cold Storage",
  "CA Storage",
  "Open Storage",
  "On-farm Shed",
  "Other",
] as const;

export const laborOptions = [
  "Permanent",
  "Seasonal",
  "Contract-based",
] as const;

/* -------------------- SCHEMA -------------------- */
export const FarmInfrastructureSchema = z.object({
  equipmentOwned: multiSelectRequired(),

  storageFacilities: multiSelectRequired(),

  permanentLabor: countValidator(),
  seasonalLabor: countValidator(),
  contractBasedLabor: countValidator(),

  otherTools: multiSelectRequired(),
});
