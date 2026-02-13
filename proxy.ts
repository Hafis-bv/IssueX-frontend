import { NextRequest, NextResponse } from "next/server";

const AUTH_PAGES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage = AUTH_PAGES.some((route) => pathname.startsWith(route));

  // Unauthorized: only allow auth pages; send everyone else to login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Authorized: don't allow auth pages; send to home
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
