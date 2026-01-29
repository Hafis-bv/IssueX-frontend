"use client";

import Link from "next/link";
import { Input } from "./Input";
import { ChangeEvent, FormEvent, useState } from "react";
import { ContactFormData, ErrorState } from "@/schemas/contact";
import { z } from "zod";

export function RegisterForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ErrorState>({
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    general: null,
  });

  const registerSchema = z
    .object({
      username: z.string().min(3, "Username must be at least 3 characters"),
      email: z.email("Invalid email address"),
      password: z.string().min(4, "Password must be at least 4 characters"),
      confirmPassword: z.string(),
    })
    .refine((formData) => formData.password === formData.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const flattened = z.flattenError(result.error);
      const fieldErrors = flattened.fieldErrors; // не до конца понял что это делает

      setErrors({
        username: fieldErrors.username?.[0] ?? null,
        email: fieldErrors.email?.[0] ?? null,
        password: fieldErrors.password?.[0] ?? null,
        confirmPassword: fieldErrors.confirmPassword?.[0] ?? null,
        general: null,
      });
      return;
    }
  };
  try {
  } catch (err) {
    console.log(err);
  }
  return (
    <div className="grid xl:grid-cols-2 h-screen">
      <div className="bg-primary/80"></div>
      <div className="flex flex-col items-center text-center gap-4 py-40 xl:px-0">
        <h1 className="text-4xl font-semibold tracking-[2px]">
          Sign Up An Account
        </h1>
        <p className="text-gray-400 text-lg font-medium">
          Enter personal data to create your account
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-6 sm:w-150 w-[90%] mt-8"
        >
          <label
            className="flex text-left col-span-2 sm:col-span-1 flex-col gap-2"
            htmlFor="username"
          >
            <span className="font-semibold">Username</span>
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
              id="username"
              placeholder="Enter username"
              error={errors.username}
            />
          </label>
          <label
            className="flex text-left col-span-2 sm:col-span-1 flex-col gap-2"
            htmlFor="email"
          >
            <span className="font-semibold">Email</span>
            <Input
              value={formData.email}
              onChange={handleChange}
              name="email"
              type="email"
              id="email"
              placeholder="Enter email address"
              error={errors.email}
            />
          </label>
          <label
            className="flex text-left flex-col gap-2 col-span-2"
            htmlFor="password"
          >
            <span className="font-semibold">Password</span>
            <Input
              value={formData.password}
              onChange={handleChange}
              name="password"
              type="password"
              id="password"
              placeholder="Enter your password"
              error={errors.password}
            />
          </label>
          <label
            className="flex text-left flex-col gap-2 col-span-2"
            htmlFor="confirmPassword"
          >
            <span className="font-semibold">Confirm password</span>
            <Input
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              error={errors.confirmPassword}
            />
          </label>
          <button className="rounded-2xl bg-primary border border-transparent xl:hover:border-primary xl:hover:bg-transparent xl:hover:text-primary transition-all duration-300 p-3 col-span-2 font-medium cursor-pointer">
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              className="text-white font-semibold underline"
              href={"/login"}
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
