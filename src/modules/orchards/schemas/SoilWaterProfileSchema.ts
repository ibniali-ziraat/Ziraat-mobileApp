import {
  multiSelectOptional,
  numberField,
  singleSelectRequired,
} from "@/src/lib/validation";
import { z } from "zod";

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
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const waterAvailabilityOptions = ["Year-round", "Seasonal", "Limited"];

export const SoilWaterProfileSchema = z
  .object({
    soilType: singleSelectRequired("Soil type is required"),

    soilHealthStatus: multiSelectOptional(),

    lastSoilTestDate: z.string().optional(),

    waterSource: singleSelectRequired("Water source is required"),

    irrigationMethod: singleSelectRequired("Irrigation method is required"),

    waterAvailability: singleSelectRequired("Water availability is required"),

    soilTestRecordsDone: z.boolean(),

    soilPH: numberField().optional(),
    soilNitrogen: numberField().optional(),
    soilPhosphorus: numberField().optional(),
    soilPotassium: numberField().optional(),
    soilOrganicCarbon: numberField().optional(),

    soilMicronutrients: z.string().optional(),

    soilTestReportUrl: z.preprocess((val) => val ?? null, z.any().nullable()),
  })
  .superRefine((data, ctx) => {
    if (data.soilTestRecordsDone === true && !data.soilTestReportUrl) {
      ctx.addIssue({
        path: ["soilTestReportUrl"],
        code: z.ZodIssueCode.custom,
        message: "Required Field",
      });
    }
  });
