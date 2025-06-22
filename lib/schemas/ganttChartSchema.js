import { z } from "zod";
export const ganttChartSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(30, "Title must not exceed 30 characters"),
});
