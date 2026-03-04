// StepI_OptionalFutureFields.schema.ts
import {
  multiSelectOptional,
  singleSelectOptional,
} from "@/src/lib/validation";
import { z } from "zod";

/* -------------------- OPTIONS -------------------- */

/* ---------------------- UPDATED SCHEMA ---------------------- */

export const OptionalFutureFieldsSchema = z.object({
  /** 1️⃣ Government Schemes (Required multi-select) */
  governmentSchemesAvailed: multiSelectOptional(),

  /** 2️⃣ FPO Membership (Now mandatory text) */
  fpoMembership: singleSelectOptional(),

  /** 3️⃣ Certifications (Required single select) */
  certifications: multiSelectOptional(),

  /** 4️⃣ Digital Tools (Required multi-select) */
  digitalTools: multiSelectOptional(),
});
