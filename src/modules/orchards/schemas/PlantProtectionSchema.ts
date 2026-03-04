import { booleanRequired, multiSelectOptional } from "@/src/lib/validation";
import { z } from "zod";

export const PlantProtectionSchema = z.object({
  /* OPTIONAL multi select */
  diseaseHistory: multiSelectOptional(),

  /* OPTIONAL multi select */
  pestHistory: multiSelectOptional(),

  /* OPTIONAL chip input (array of strings) */
  spraySchedule: z.preprocess(
    (val) => val ?? [],
    z.array(z.string()).optional(),
  ),

  /* REQUIRED yes/no select */
  isCropInsuranceCovered: booleanRequired(),
});

export type PlantProtectionSchemaType = z.infer<typeof PlantProtectionSchema>;
