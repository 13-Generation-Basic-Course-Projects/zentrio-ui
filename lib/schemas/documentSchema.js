import { z } from "zod";

export const folderSchema  = z.object({
  name: z
  .string()
  .min(1, { message: "Folder name is required"})
  .max(30, { message: "Folder name must be under 30 characters"})
})