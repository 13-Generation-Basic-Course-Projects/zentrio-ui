import { z } from "zod";

export const taskFormSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(40,"Title can contain only 40 characters"),
    description: z.string().min(1, "Description is required").max(200,"Description can contain only 200 characters"),
    dateRange: z
      .object({
        start: z.string().refine((val) => !isNaN(Date.parse(val)), {
          message: "Invalid start date",
        }),
        end: z.string().refine((val) => !isNaN(Date.parse(val)), {
          message: "Invalid end date",
        }),
      })
      .refine((data) => new Date(data.start) <= new Date(data.end), {
        message: "End date must be after start date",
        path: ["end"],
      }),
    ganttBarId: z.string().min(1, "Gantt bar is required"),
    teamLeader: z.string().optional(),
  })
  .refine(
    (data) => {
      return true; // Additional Gantt bar date validation is handled in onSubmit
    },
    { message: "Invalid date range", path: ["dateRange"] }
  );
