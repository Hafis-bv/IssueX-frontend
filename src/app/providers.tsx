"use client";

import ProjectProvider from "@/context/projectContext";
import { TaskProvider } from "@/context/taskContext";
import UserProvider from "@/context/userContext";
import { ReactNode } from "react";
import { Bounce, ToastContainer } from "react-toastify";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <UserProvider>
      <ProjectProvider>
        <TaskProvider>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Bounce}
            toastClassName={() =>
              "relative flex min-h-10 rounded-lg border border-[#1a1d24] bg-[#0d111a] text-zinc-200 p-4 my-2"
            }
            progressClassName="!bg-[#5b48ee]"
          />
          {children}
        </TaskProvider>
      </ProjectProvider>
    </UserProvider>
  );
}
