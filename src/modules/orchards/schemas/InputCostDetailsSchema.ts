// StepH_InputCostDetails.schema.ts
import { singleSelectOptional } from "@/src/lib/validation";
import { z } from "zod";

/* -------------------- OPTIONS -------------------- */

/* -------------------- SCHEMA (ALL MANDATORY) -------------------- */

export const InputCostDetailsSchema = z.object({
  pesticideSupplierLocation: singleSelectOptional(),

  paymentType: singleSelectOptional(),

  creditPeriod: singleSelectOptional(),
});
