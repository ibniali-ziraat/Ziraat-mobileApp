import { z } from "zod";

export const productPortfolioSchema = z.object({
  storageCapacityValue: z.string().optional(),
  storageCapacityUnit: z.string().nullable().optional(),

  inputTypes: z.preprocess(
    (val) => val ?? [],
    z.array(z.string()).nonempty("Select at least one input type")
  ),

  majorBrands: z.preprocess(
    (val) => val ?? [],
    z.array(z.string()).nonempty("Select at least one brand")
  ),

  customInputs: z.preprocess(
    (val) => {
      if (!Array.isArray(val)) return [];
      return val.filter(
        (item) =>
          item &&
          (item.productName?.trim()?.length ||
            item.stockQuantity?.toString()?.length)
      );
    },
    z.array(
      z.object({
        productName: z.string().min(1, "Product name is required"),
        stockQuantity: z.string().min(0).optional(),
        unit: z.string().nullable().optional(),
      })
    )
  ),
});
