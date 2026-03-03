import { z } from "zod";
 
export const addressSchema = z.object({
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
 
  phone: z
    .string()
    .min(10, "Phone number must be valid")
    .max(15, "Phone number too long"),
 
  countryId: z.string().min(1, "Please select a country"),
 
  stateOrProvinceId: z.string().min(1, "Please select a state"),
 
  districtId: z.string().min(1, "Please select a district"),
 
  addressLine1: z.string().min(5, "Address Line 1 is required"),
 
  addressLine2: z.string().optional(),
 
  city: z.string().min(2, "City is required"),
 
  zipCode: z.string().min(4, "Zip code required"),
});
 
export type AddressFormData = z.infer<typeof addressSchema>;
 