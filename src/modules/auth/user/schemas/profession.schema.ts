import z from "zod";

export const professionSchema = z.object({
  professionType: z.string().min(1, "Required Field"),
  organizationName: z.string().min(1, "Required Field"),
  designation: z.string().min(1, "Required Field"),
  experienceYears: z.string().min(1, "Required Field"),
  skills: z.string().optional(),
});
