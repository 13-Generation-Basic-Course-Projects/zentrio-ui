import { z } from "zod";

/* 
*zod for create workspace 
*/
export const createWorkspaceSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(50, { message: "Title must be at most 50 characters" })
    .refine((val) => !/^\d/.test(val), {
      message: "Title must not start with a number",
    }),
  description: z.string().optional(),
});

export const RenameSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .refine((val) => !/^\d/.test(val), {
      message: "Title must not start with a number",
    }),
});