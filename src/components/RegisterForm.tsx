"use client";

import Link from "next/link";
import { Input } from "./Input";
import { ChangeEvent, FormEvent, useState } from "react";
import { ContactFormData, contactSchema, ErrorState } from "@/schemas/contact";
import { z } from "zod";
import API from "@/utils/api";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function RegisterForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ErrorState>({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
    general: null,
  });

  const [show, setShow] = useState(false);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const flattened = z.flattenError(result.error);
      const fieldErrors = flattened.fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0] ?? null,
        email: fieldErrors.email?.[0] ?? null,
        password: fieldErrors.password?.[0] ?? null,
        confirmPassword: fieldErrors.confirmPassword?.[0] ?? null,
        general: null,
      });
      return;
    }

    try {
      const response = await API.handleRegister(formData);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
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
            htmlFor="name"
          >
            <span className="font-semibold">Username</span>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              id="name"
              placeholder="Enter username"
              error={errors.name}
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
            <div className="relative">
              <Input
                value={formData.password}
                onChange={handleChange}
                name="password"
                type={show ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                error={errors.password}
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute top-1/2 -translate-y-1/2 right-4 hover:bg-[#363a44] transition-all duration-300 p-2 rounded-lg cursor-pointer"
              >
                {show ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
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
          {errors.general && (
            <span className="text-red-600 text-xs col-span-2">
              {errors.general}
            </span>
          )}
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
