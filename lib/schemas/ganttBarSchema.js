import { z } from "zod";

export const ganttBarSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title cannot exceed 100 characters" }),
  duration: z.date({
    required_error: "Duration is required",
    invalid_type_error: "Duration must be a valid date",
  }),
});
