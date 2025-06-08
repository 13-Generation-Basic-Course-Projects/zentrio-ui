import { z } from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  date: z
    .string()
    .min(1, { message: "Date is required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
  name: z.string().min(1, { message: "Team leader name is required" }),
  ganttBar: z.enum(["planning", "development", "review"], {
    errorMap: () => ({ message: "Gantt bar selection is required" }),
  }),
  description: z.string().trim().min(1, { message: "Description is required" }),
});
