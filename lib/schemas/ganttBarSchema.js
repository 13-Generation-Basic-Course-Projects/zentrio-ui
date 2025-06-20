import { z } from "zod";

const faceEnum = [
  "PLANNING",
  "REQUIREMENT_ANALYSIS",
  "DESIGN",
  "IMPLEMENTATION",
  "TESTING_AND_REVIEW",
  "DEPLOYMENT_AND_MAINTENANCE",
];

export const ganttBarSchema = z.object({
  title: z.string().min(1, "Title is required").max(50,"Title allow only 50 characters"),
  startedAt: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), { message: "Invalid date" }),
  finishedAt: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), { message: "Invalid date" }),
  face: z.enum(faceEnum, { required_error: "Face is required" }),
  ganttChartId: z.string().uuid("Invalid UUID format for ganttChartId"),
});
