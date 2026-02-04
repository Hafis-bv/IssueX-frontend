"use client";

import UserProvider from "@/context/userContext";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <UserProvider>{children}</UserProvider>;
}
