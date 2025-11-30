import { z } from "zod";

export const productPortfolioSchema = z.object({
  inputTypesSold: z.preprocess(
    (val) => val ?? [],
    z.array(z.string()).nonempty("Select at least one input")
  ),

  // majorBrands: z.string().min(1, "Major brands stocked are required"),
  majorBrandsStocked: z
    .array(z.string().min(1))
    .min(1, "At least one brand is required"),

  customInputList: z.preprocess(
    (val) => {
      if (!Array.isArray(val)) return [];
      return val.filter(
        (item) =>
          item &&
          (item.name?.trim()?.length || item.stockQuantity?.toString()?.length)
      );
    },
    z.array(
      z.object({
        name: z.string().min(1, "Input name is required"),
        stockQuantity: z.string().min(1, "Stock quantity is required"),
      })
    )
  ),

  storageCapacity: z.string().optional(),
});
