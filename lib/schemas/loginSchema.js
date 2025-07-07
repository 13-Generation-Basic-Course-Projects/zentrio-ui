// lib/schemas/loginSchema.ts
// lib/schemas/loginSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address format")
    .refine(
      (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email.trim()),
      "Email must be a valid Gmail address with no spaces (@gmail.com)"
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine(
      (password) => /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/.test(password),
      "Password must contain only  characters and symbols (no spaces)"
    ),
});