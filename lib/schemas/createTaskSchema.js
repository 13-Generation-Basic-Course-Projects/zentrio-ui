import { z } from "zod";

export const taskFormSchema = z
  .object({
    title: z.string().min(1, { message: "Title is required" }),
    startedAt: z
      .string()
      .min(1, { message: "Start date is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid start date format",
      }),
    finishedAt: z
      .string()
      .min(1, { message: "End date is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid end date format",
      }),
    ganttBarId: z.string().uuid({ message: "Valid Gantt bar ID is required" }),

    teamLeader: z.string().optional(),
  })
  .refine((data) => new Date(data.startedAt) <= new Date(data.finishedAt), {
    message: "End date must be after or equal to start date",
    path: ["finishedAt"],
  });
