"use client";
import { createContext, ReactNode, useState } from "react";

interface UserProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContext {
  user: User | null;
}

const userContext = createContext<UserContext | undefined>(undefined);

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <userContext.Provider value={{ user }}>{children}</userContext.Provider>
  );
}
