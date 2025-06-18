// lib/schemas/inviteMemberSchema.ts
import { z } from "zod";

export const inviteMemberSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),
  role: z
    .string({
      required_error: "Role is required",
      invalid_type_error: "Role must be a string",
    })
    .min(1, "Please select a role"),
});
