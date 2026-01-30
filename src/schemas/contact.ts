import { z } from "zod";

export const contactSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 or more characters"),
    email: z.email("Invalid email"),
    password: z
      .string()
      .min(6, "Password must be at least 6 or more characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ContactFormData = z.infer<typeof contactSchema>;

export type ErrorState = {
  username: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  general: string | null;
};
