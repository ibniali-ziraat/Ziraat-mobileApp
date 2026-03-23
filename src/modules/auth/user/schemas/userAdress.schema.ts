import {
  fullNameValidator,
  phoneValidator,
  pincodeValidator,
} from "@/src/lib/validation";
import { z } from "zod";

export const addressSchema = z.object({
  contactName: fullNameValidator,

  phone: phoneValidator,

  countryId: z.string().min(1, "Required Field"),

  stateOrProvinceId: z.string().min(1, "Required Field"),

  districtId: z.string().min(1, "Required Field"),

  addressLine1: z.string().min(5, "Required Field"),

  addressLine2: z.string().optional(),

  city: z.string().min(2, "Required Field"),

  zipCode: pincodeValidator,
});

export type AddressFormData = z.infer<typeof addressSchema>;
