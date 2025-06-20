import { z } from "zod";

export const profileSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(50, "Username max size is 50 characters"),
  gender: z.string().min(1, "Gender is required"),
  position: z
    .string()
    .min(1, "Position is required")
    .max(50, "Position max size is 50 characters"),
  location: z
    .string()
    .min(1, "Location is required")
    .max(100, "Location max size is 100 characters"),
  contact: z
    .string()
    .min(9,"Contact must be at least 10 characters"),
});
