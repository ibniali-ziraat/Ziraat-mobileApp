import { z } from "zod";

export const AskQuestionSchema =
  z.object({
    title: z
      .string()
      .trim()
      .min(
        5,
        "Title is required"
      )
      .max(
        50,
        "Title cannot exceed 50 characters"
      ),

    body: z
      .string()
      .trim()
      .min(
        10,
        "title is required"
      )
      .max(
        500,
        "Description cannot exceed 500 characters"
      ),

   tagsInput: z
  .array(
    z
      .string()
      .trim()
      .min(
        2,
        "Please add valid tags"
      )
      .max(
        20,
        "Tag cannot exceed 20 characters"
      )
  )
  .min(
    1,
    "Please add at least one valid tag"
  )
  .max(
    5,
    "Maximum 5 tags allowed"
  ),

    bountyAmount: z
      .string()
      .optional(),
  });

export type AskQuestionSchemaType =
  z.infer<
    typeof AskQuestionSchema
  >;