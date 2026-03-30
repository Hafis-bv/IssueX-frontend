"use client";
import { NewTask } from "@/widgets/NewTask";
import { TaskList } from "@/widgets/TaskList";

export default function Home() {
  return (
    <div>
      <TaskList />
      <NewTask />
    </div>
  );
}
