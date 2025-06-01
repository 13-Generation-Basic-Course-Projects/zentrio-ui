import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(5, "Username must be at least 5 characters."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine((val) => val, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
