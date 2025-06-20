import { z } from "zod";
import { today, getLocalTimeZone } from "@internationalized/date";

export const checklistSchema = ({ taskStartedAt, taskFinishedAt }) =>
  z.object({
    title: z.string().min(1, "Title is required"),
    duration: z.object({
      start: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid start date")
        .refine(
          (date) => new Date(date) >= today(getLocalTimeZone()).toDate(),
          "Start date must be today or in the future"
        )
        .refine(
          (date) => !taskStartedAt || new Date(date) >= new Date(taskStartedAt),
          "Start date cannot be before task's start date"
        ),
      end: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid end date")
        .refine(
          (date) => new Date(date) >= today(getLocalTimeZone()).toDate(),
          "End date must be today or in the future"
        )
        .refine(
          (date) =>
            !taskFinishedAt || new Date(date) <= new Date(taskFinishedAt),
          "End date cannot exceed task's end date"
        ),
    }),
    description: z.string().optional(),
  });
