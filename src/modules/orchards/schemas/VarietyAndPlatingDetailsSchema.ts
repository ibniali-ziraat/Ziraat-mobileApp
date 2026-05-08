import { numberField } from "@/src/lib/validation";
import { z } from "zod";

export const VarietyAndPlatingDetailsSchema = z.object({
  varieties: z.array(
    z.object({
      varietyName: z.string().min(1, "Required Field"),

      numberOfTrees: numberField(),

      rootstockUsed: z.string().optional(),

      plantDensity: z.string().optional(),

      treesLessThan5Years: numberField(),

      treesFiveToTenYears: numberField(),

      treesMoreThan10Years: numberField(),
    }),
  ),
});
