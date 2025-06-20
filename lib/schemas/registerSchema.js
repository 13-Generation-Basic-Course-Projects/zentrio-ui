import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(5, "Username must be at least 5 characters.")
      .max(20, "Username allow only 20 characters"),
    email: z.string().email("Invalid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
        "Password must contain at least one uppercase letter, one number, and one special character"
      ),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine((val) => val, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
