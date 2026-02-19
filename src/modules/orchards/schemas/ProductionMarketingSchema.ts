import {
  numberField,
  optionalPhoneValidator,
  optionalString,
  requiredDate,
  singleSelectRequired,
} from "@/src/lib/validation";
import { z } from "zod";

export const ProductionMarketingSchema = z.object({
  yieldUnit: singleSelectRequired(),
  averageAnnualYield: numberField(),

  peakHarvestFromMonth: requiredDate(),

  peakHarvestToMonth: requiredDate(),

  sellingPreference: singleSelectRequired(),

  buyerName: optionalString(),

  buyerContact: optionalPhoneValidator,
});
