import z from "zod";

export const educationSchema = z.object({
  highestQualification: z.string().min(1, "Required Field"),
  instituteName: z.string().min(1, "Required Field"),
  passingYear: z.coerce.number().int().min(1, "Required Field"),
  specialization: z.string().optional(),
});
