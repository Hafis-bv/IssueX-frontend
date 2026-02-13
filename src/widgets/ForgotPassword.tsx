"use client";

import { Input } from "@/components/Input";
import API from "@/utils/api";
import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";

interface ErrorState {
  email: string | null;
  general: string | null;
}

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<ErrorState>({
    email: null,
    general: null,
  });

  const forgotSchema = z.object({
    email: z.email("Invalid email"),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = forgotSchema.safeParse(email);

    if (!result.success) {
      const flattened = z.flattenError(result.error);
      const fieldErrors = flattened.fieldErrors;

      setErrors({
        email: fieldErrors.email?.[0] ?? null,
        general: null,
      });
      return;
    }

    try {
      await API.handleForgot(email);
      console.log("wifhpu");
    } catch (err: any) {
      console.log(err);
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.err ||
        "Something went wrong";

      setErrors({ ...errors, general: message });
    }
  };

  return (
    <div className="flex flex-col gap-5 h-screen items-center justify-center">
      <h1 className="text-3xl text-center">Forgot password</h1>
      <p>Enter your email to reset your password</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-5"
      >
        <Input
          placeholder="Enter email address"
          name="email"
          type="email"
          id="email"
          onChange={handleChange}
          error={errors.email}
          value={email}
        />
        {errors.general && (
          <span className="text-red-600 mr-auto">{errors.general}</span>
        )}
        <button className="bg-primary text-bg border py-2.5 w-80 px-5 font-semibold border-primary text-xl rounded-xl cursor-pointer hover:bg-transparent hover:text-primary transition duration-300">
          Send
        </button>
      </form>
    </div>
  );
}
