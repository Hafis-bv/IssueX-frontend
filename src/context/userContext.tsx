"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import API from "@/utils/api";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function refreshUser() {
    setIsLoading(true);
    try {
      const res = await API.handleMe();

      console.log(res);
    } catch (e) {
      console.log(e);
      setUser(null);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <userContext.Provider value={{ user }}>{children}</userContext.Provider>
  );
}
