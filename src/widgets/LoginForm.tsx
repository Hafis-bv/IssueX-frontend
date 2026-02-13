"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../components/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ErrorLoginState, LoginFormData, loginSchema } from "@/schemas/login";
import { z } from "zod";
import API from "@/utils/api";
import { setAuthCookie } from "@/utils/auth-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/userContext";

export function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorLoginState>({
    email: null,
    password: null,
    general: null,
  });

  const { refreshUser } = useAuth();

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const flattened = z.flattenError(result.error);
      const fieldErrors = flattened.fieldErrors;

      setErrors({
        email: fieldErrors.email?.[0] ?? null,
        password: fieldErrors.password?.[0] ?? null,
        general: null,
      });
      return;
    }

    setLoading(true);

    try {
      await API.handleLogin(formData);
      setAuthCookie();
      await refreshUser();
      router.push("/");
    } catch (err: any) {
      console.log(err);
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.err ||
        "Something went wrong";

      setErrors({ ...errors, general: message });
    } finally {
      setLoading(false);
      console.log(errors);
    }
  };

  const [show, setShow] = useState(false);
  return (
    <div className="grid xl:grid-cols-2 h-screen">
      <div className="bg-primary/80"></div>
      <div className="flex flex-col items-center text-center gap-4 py-40 xl:px-0">
        <h1 className="text-4xl font-semibold tracking-[2px]">
          Sign In to Account
        </h1>
        <p className="text-gray-400 text-lg font-medium">
          Enter your credentials to access your account
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-6 sm:w-150 w-[90%] mt-8"
        >
          <label
            className="flex text-left col-span-2 flex-col gap-2"
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
          {errors.general && (
            <span className="text-red-600 mr-auto">{errors.general}</span>
          )}
          <button
            disabled={loading}
            className="rounded-2xl bg-primary border border-transparent xl:hover:border-primary xl:hover:bg-transparent xl:hover:text-primary transition-all duration-300 p-3 col-span-2 font-medium cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link
              className="text-white font-semibold underline"
              href={"/register"}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
