import { numberField } from "@/src/lib/validation";
import { z } from "zod";

export const VarietyAndPlatingDetailsSchema = z.object({
  varieties: z.array(
    z
      .object({
        varietyName: z.string().min(1, "Required Field"),

        numberOfTrees: numberField(),

        rootstockUsed: z.string().optional(),

        plantDensity: z.string().optional(),

        treesLessThan5Years: numberField(),

        treesFiveToTenYears: numberField(),

        treesMoreThan10Years: numberField(),
      })
      .superRefine((variety, ctx) => {
        const treesByAge =
          variety.treesLessThan5Years +
          variety.treesFiveToTenYears +
          variety.treesMoreThan10Years;

        if (treesByAge > variety.numberOfTrees) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["treesMoreThan10Years"],
            message: "Tree age counts cannot exceed the total number of trees",
          });
        }
      }),
  ),
});
