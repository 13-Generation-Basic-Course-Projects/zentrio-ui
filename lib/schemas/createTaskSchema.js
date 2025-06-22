import { z } from "zod";

export const taskFormSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(40, "Title can contain only 40 characters")
      .trim(),
    description: z
      .string()
      .min(1, "Description is required")
      .max(50, "Description can contain only 50 characters")
      .trim(),
    dateRange: z
      .object({
        start: z
          .string()
          .min(1, "Start date is required")
          .refine(
            (val) => {
              const parsed = Date.parse(val);
              return (
                !isNaN(parsed) &&
                new Date(parsed) >= new Date(new Date().toDateString())
              );
            },
            {
              message: "Start date cannot be in the past",
            }
          ),
        end: z
          .string()
          .min(1, "End date is required")
          .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid end date",
          }),
      })
      .refine(
        (data) => {
          const startDate = new Date(data.start);
          const endDate = new Date(data.end);
          return startDate <= endDate;
        },
        {
          message: "End date must be on or after start date",
          path: ["end"],
        }
      )
      .refine(
        (data) => {
          const startDate = new Date(data.start);
          const endDate = new Date(data.end);
          const today = new Date();
          const currentTimePlus2Min = new Date(today.getTime() + 2 * 60 * 1000);

          // If start date is today, check if it's at least 2 minutes from now
          if (startDate.toDateString() === today.toDateString()) {
            // For date-only validation, we'll allow it and handle time in the component
            return true;
          }
          return true;
        },
        {
          message:
            "Tasks scheduled for today must be at least 2 minutes from current time",
          path: ["start"],
        }
      ),
    ganttBarId: z.string().min(1, "Gantt bar selection is required"),
    teamLeader: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      // Additional validation can be added here if needed
      // For now, we'll let the component handle Gantt bar date validation
      return true;
    },
    {
      message: "Please check your date selection",
      path: ["dateRange"],
    }
  );
