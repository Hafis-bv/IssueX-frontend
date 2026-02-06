"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import API from "@/utils/api";
import { CustomLoading } from "@/components/CustomLoading";

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
  refreshUser: () => Promise<void>;
}

const userContext = createContext<UserContext | undefined>(undefined);

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function refreshUser() {
    setIsLoading(true);
    try {
      const res = await API.handleMe();
      setUser(res.user);
    } catch (e) {
      console.log(e);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  if (isLoading) {
    return <CustomLoading />;
  }

  return (
    <userContext.Provider value={{ user, refreshUser }}>
      {children}
    </userContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(userContext);

  if (!context) throw new Error("useAuth must be used within a user");

  return context;
};
