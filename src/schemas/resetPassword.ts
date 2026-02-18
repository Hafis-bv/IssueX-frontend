import { z } from "zod";

export const resetSchema = z
  .object({
    otp: z.string().min(6, "OTP is required").max(6, "OTP is required"),
    email: z.email("Invalid email"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmNewPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ResetPasswordState = z.infer<typeof resetSchema>;
