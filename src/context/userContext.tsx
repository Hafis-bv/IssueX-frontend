"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import API from "@/utils/api";
import { clearAuthCookie } from "@/utils/auth-cookie";
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
  setUser: Dispatch<SetStateAction<User | null>>;
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
      return res.user;
    } catch (e: any) {
      console.log(e);
      setUser(null);
      const status = e?.response?.status;
      if (status === 401 || status === 403) {
        clearAuthCookie();
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      const me = await refreshUser();
      if (!me) return;

      // тут уже можно грузить проекты
      // const projects = await API.handleAllProjects();
      // setProjects(projects);
    })();
  }, []);

  if (isLoading) {
    return <CustomLoading />;
  }

  return (
    <userContext.Provider value={{ user, refreshUser, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(userContext);

  if (!context) throw new Error("useAuth must be used within a user");

  return context;
};
