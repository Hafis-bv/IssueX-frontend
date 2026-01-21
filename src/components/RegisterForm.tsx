import Link from "next/link";
import { Input } from "./Input";

export async function RegisterForm() {
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
        <form className="grid grid-cols-2 gap-6 sm:w-150 w-[90%] mt-8">
          <label
            className="flex text-left col-span-2 sm:col-span-1 flex-col gap-2"
            htmlFor="username"
          >
            <span className="font-semibold">Username</span>
            <Input type="text" id="username" placeholder="Enter username" />
          </label>
          <label
            className="flex text-left col-span-2 sm:col-span-1 flex-col gap-2"
            htmlFor="email"
          >
            <span className="font-semibold">Email</span>
            <Input type="email" id="email" placeholder="Enter email address" />
          </label>
          <label
            className="flex text-left flex-col gap-2 col-span-2"
            htmlFor="password"
          >
            <span className="font-semibold">Password</span>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </label>
          <label
            className="flex text-left flex-col gap-2 col-span-2"
            htmlFor="confirmPassword"
          >
            <span className="font-semibold">Confirm password</span>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
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
