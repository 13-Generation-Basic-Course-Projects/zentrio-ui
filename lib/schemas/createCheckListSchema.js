import { z } from "zod";
export const checklistSchema = z.object({
  title: z.string().min(1, "Title is required"),
  duration: z.object({
    start: z.string().min(1, "Start date is required"),
    end: z.string().min(1, "End date is required"),
  }),
  description: z.string().optional(),
});
