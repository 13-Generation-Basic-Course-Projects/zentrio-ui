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
  description: z.string().min(1, { message: "Description is required" }),
});

export const RenameSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .refine((val) => !/^\d/.test(val), {
      message: "Title must not start with a number",
    }),
});

// File validator that works in both server and client environments
const fileValidator = z.any().refine(
  (value) => {
    // Skip File validation on server-side (where window is undefined)
    if (typeof window === 'undefined') return true;
    
    // In browser, validate if it's actually a File object
    return value instanceof File;
  },
  { message: "Cover must be a file" }
);

export const createBoardSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(50, { message: "Title must be at most 50 characters" })
    .refine((val) => !/^\d/.test(val), {
      message: "Title must not start with a number",
    }),
  description: z.string().min(1, { message: "Description is required" }),
  cover: z.union([
    z.string().min(1, "Cover color or image is required"), // for color keys
    fileValidator, // Safe file validation for both server and client
  ]),
});