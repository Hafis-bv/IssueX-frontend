"use client";
import { useAuth } from "@/context/userContext";
import { TaskList } from "@/widgets/TaskList";

export default function Home() {
  const { user } = useAuth();
  return (
    <div>
      {/* <h1>{user ? `Hello ${user.name}` : "Not logged In"}</h1> */}
      <TaskList />
    </div>
  );
}
