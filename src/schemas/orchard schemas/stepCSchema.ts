import { z } from "zod";

export const yesNoOptions = ["Yes", "No"] as const;

export const soilTypeOptions = [
  "Sandy Clay Loam",
  "Sandy Loam",
  "Sandy Clay",
  "Sandy",
  "Silt Loam",
  "Heavy Clay",
  "Silt Clay",
  "Silt",
  "Silt Clay Loam",
  "Not getting",
] as const;

export const soilHealthOptions = ["Acidic", "Alkaline", "Not Known"] as const;

export const waterSourceOptions = [
  "Canal",
  "Borewell",
  "Rainfed",
  "Spring",
  "Other",
] as const;

export const irrigationOptions = ["Drip", "Sprinkler", "Flood", "None"] as const;

export const waterAvailabilityOptions = [
  "Round-the-year",
  "Seasonal",
  "Not available",
] as const;

export const stepCSoilWaterSchema = z
  .object({
    soilType: z.enum(soilTypeOptions),
    soilHealth: z.enum(soilHealthOptions),

    lastSoilTestDone: z.enum(yesNoOptions),
    lastSoilTestDate: z.string().optional().nullable(),

    soilTestRecordsDone: z.enum(yesNoOptions),

    soilPH: z.string().optional(),
    soilN: z.string().optional(),
    soilP: z.string().optional(),
    soilK: z.string().optional(),
    soilOrganicCarbon: z.string().optional(),
    soilMicronutrients: z.string().optional(),

    soilTestFileToggle: z.enum(yesNoOptions),
    soilTestFile: z.any().optional(),

    waterSource: z.enum(waterSourceOptions),
    irrigationMethod: z.enum(irrigationOptions),
    waterAvailability: z.enum(waterAvailabilityOptions),
  })

  .superRefine((data, ctx) => {
    // Last Soil Test Date Required
    if (data.lastSoilTestDone === "Yes" && !data.lastSoilTestDate) {
      ctx.addIssue({
        path: ["lastSoilTestDate"],
        message: "Please select the soil test date",
      });
    }

    // Soil Test Records Required
    if (data.soilTestRecordsDone === "Yes") {
      const requiredFields = [
        ["soilPH", "pH is required"],
        ["soilN", "Nitrogen is required"],
        ["soilP", "Phosphorus is required"],
        ["soilK", "Potassium is required"],
        ["soilOrganicCarbon", "Organic Carbon is required"],
        ["soilMicronutrients", "Micronutrients required"],
      ];

      requiredFields.forEach(([path, msg]) => {
        if (!data[path]) {
          ctx.addIssue({ path: [path], message: msg });
        }
      });
    }

    // File Upload Required
    if (data.soilTestFileToggle === "Yes" && !data.soilTestFile) {
      ctx.addIssue({
        path: ["soilTestFile"],
        message: "Upload Soil Test Report",
      });
    }
  });

export type StepCSoilWaterType = z.infer<typeof stepCSoilWaterSchema>;
