import {
  multiSelectOptional,
  numberField,
  singleSelectRequired,
} from "@/src/lib/validation";
import { z } from "zod";

// today as YYYY-MM-DD in the device's local timezone
export const todayISO = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

/* Options */
export const soilTypeOptions = [
  "Clay",
  "Sandy",
  "Loamy",
  "Silty",
  "Peaty",
  "Chalky",
];

export const waterSourceOptions = [
  "Canal",
  "Borewell",
  "Open Well",
  "River",
  "Pond",
  "Rainfed",
];

export const irrigationOptions = ["Drip", "Sprinkler", "Flood", "Manual"];

export const waterAvailabilityOptions = ["Year-round", "Seasonal", "Limited"];

export const SoilWaterProfileSchema = z.object({
  soilType: singleSelectRequired("Soil type is required"),

  soilHealthStatus: multiSelectOptional().pipe(
    z.array(z.string()).max(1, "Select only one soil health status"),
  ),

  lastSoilTestDate: z
    .string()
    .optional()
    .refine((v) => !v || v.split("T")[0] <= todayISO(), {
      message: "Latest soil test date cannot be in the future",
    }),

  waterSource: singleSelectRequired("Water source is required"),

  irrigationMethod: singleSelectRequired("Irrigation method is required"),

  waterAvailability: singleSelectRequired("Water availability is required"),

  soilPH: numberField().optional(),
  soilNitrogen: numberField().optional(),
  soilPhosphorus: numberField().optional(),
  soilPotassium: numberField().optional(),
  soilOrganicCarbon: numberField().optional(),
  soilMicronutrients: z.string().optional(),
});
