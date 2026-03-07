"use client";

import { Input } from "@/components/Input";
import API from "@/utils/api";
import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { ResetPasswordState, resetSchema } from "@/schemas/resetPassword";

interface ResetErrorsState {
  otp: string | null;
  newPassword: string | null;
  confirmNewPassword: string | null;
  general: string | null;
}

export function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") ?? "";

  const [resetForm, setResetForm] = useState<ResetPasswordState>({
    otp: "",
    email: emailFromQuery,
    newPassword: "",
    confirmNewPassword: "",
  });

  const [resetErrors, setResetErrors] = useState<ResetErrorsState>({
    otp: null,
    newPassword: null,
    confirmNewPassword: null,
    general: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setResetForm((prev) => ({ ...prev, [name]: value }));
    setResetErrors((prev) => ({ ...prev, [name]: null, general: null }));
  };

  const handleResetSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = resetSchema.safeParse(resetForm);

    if (!result.success) {
      const flattened = z.flattenError(result.error);
      const fieldErrors = flattened.fieldErrors;

      setResetErrors((prev) => ({
        ...prev,
        otp: fieldErrors.otp?.[0] ?? null,
        email: fieldErrors.email?.[0] ?? null,
        newPassword: fieldErrors.newPassword?.[0] ?? null,
        confirmNewPassword: fieldErrors.confirmNewPassword?.[0] ?? null,
        general: flattened.formErrors?.[0] ?? null,
      }));

      setIsSubmitting(false);
      return;
    }

    try {
      await API.handleResetPassword(resetForm);
      router.push("/login");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.err ||
        "Something went wrong";

      setResetErrors((prev) => ({ ...prev, general: message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 h-screen items-center justify-center">
      <h1 className="text-3xl text-center">Reset password</h1>
      <p>Enter OTP and set a new password</p>

      <form
        onSubmit={handleResetSubmit}
        className="flex flex-col justify-center items-center gap-5"
      >
        <Input
          placeholder="Enter OTP"
          name="otp"
          type="text"
          id="otp"
          onChange={handleFieldChange}
          error={resetErrors.otp}
          value={resetForm.otp}
        />

        <Input
          placeholder="Enter new password"
          name="newPassword"
          type="password"
          id="newPassword"
          onChange={handleFieldChange}
          error={resetErrors.newPassword}
          value={resetForm.newPassword}
        />

        <Input
          placeholder="Confirm new password"
          name="confirmNewPassword"
          type="password"
          id="confirmNewPassword"
          onChange={handleFieldChange}
          error={resetErrors.confirmNewPassword}
          value={resetForm.confirmNewPassword}
        />

        {resetErrors.general && (
          <span className="text-red-600 mr-auto">{resetErrors.general}</span>
        )}

        <button
          disabled={isSubmitting}
          className="bg-primary text-bg border py-2.5 w-80 px-5 font-semibold border-primary text-xl rounded-xl cursor-pointer hover:bg-transparent hover:text-primary transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Resetting..." : "Reset password"}
        </button>
      </form>
    </div>
  );
}
