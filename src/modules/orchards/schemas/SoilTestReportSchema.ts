import { z } from "zod";

export const SoilTestReportSchema = z.object({
  // ... other fields
  reports: z
    .array(
      z
        .object({
          uri: z
            .string({ required_error: "File is required" })
            .min(1, "File is required"),
          name: z.string().optional(),
          mimeType: z.string().optional(),
        })
        .nullable(),
    )
    .min(1, "At least one report is required")
    // This part ensures each individual item is checked
    .superRefine((data, ctx) => {
      data.forEach((item, index) => {
        if (!item || !item.uri) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please upload this report",
            path: [index, "uri"], // This targets the specific empty input
          });
        }
      });
    }),
});
