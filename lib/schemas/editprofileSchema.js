import { z } from "zod";

export const profileSchema = z.object({
  username: z.string().min(1, "Username is required"),
  gender: z.string().min(1, "Gender is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().min(1, "Location is required"),
  contact: z.string().min(9, "Contact must be at least 10 characters"),
});
