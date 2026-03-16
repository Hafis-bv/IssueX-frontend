"use client";
import { useAuth } from "@/context/userContext";
import { NewTask } from "@/widgets/NewTask";
import { TaskList } from "@/widgets/TaskList";

export default function Home() {
  const { user } = useAuth();
  return (
    <div>
      <TaskList />
      <NewTask />
    </div>
  );
}
