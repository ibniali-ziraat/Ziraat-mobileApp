// StepF_FarmInfrastructure.schema.ts
import { multiSelectRequired, numberField } from "@/src/lib/validation";
import { z } from "zod";

export const FarmInfrastructureSchema = z.object({
  equipmentOwned: multiSelectRequired(),

  storageFacilities: multiSelectRequired(),

  permanentLabor: numberField(),
  seasonalLabor: numberField(),
  contractBasedLabor: numberField(),

  otherTools: multiSelectRequired(),
});
