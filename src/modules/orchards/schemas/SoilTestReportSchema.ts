import { numberField } from "@/src/lib/validation";
import { z } from "zod";

export const SoilTestReportSchema = z.object({
  soilPH: numberField().optional(),
  soilNitrogen: numberField().optional(),
  soilPhosphorus: numberField().optional(),
  soilPotassium: numberField().optional(),
  soilOrganicCarbon: numberField().optional(),

  soilMicronutrients: z.string().optional(),

  soilTestReportUrl: z.preprocess((val) => val ?? null, z.any().nullable()),
});
