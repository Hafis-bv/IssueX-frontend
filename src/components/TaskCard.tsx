"use client";

import { useTasks } from "@/hooks/useTasks";
import { formatDate } from "@/utils/formateDate";

interface TaskCardProps {
  status: "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
}

export const TaskCard = ({ status }: TaskCardProps) => {
  const { tasks, loading, error } = useTasks();

  const statusTasks = tasks.filter((task) => {
    return task.status === status;
  });

  return (
    <div className="bg-[#080b13] border border-[#1a1d24] rounded-2xl p-3 h-150 overflow-y-auto space-y-3">
      {statusTasks.map((task) => (
        <div
          key={task.id}
          className="bg-[#0d111a] border border-[#1a1d24] rounded-xl p-4 transition-all duration-200 hover:bg-[#111622] hover:border-[#2a2f3a] cursor-pointer"
        >
          <h1 className="text-sm font-medium text-zinc-100 mb-2 leading-snug">
            {task.title}
          </h1>
          <p className="text-xs text-zinc-400 mb-3">
            {formatDate(task.createdAt)}
          </p>
          <button className="text-xs px-2 py-1 rounded-md border border-[#2a2f3a] text-zinc-300 bg-[#111622]">
            {task.status}
          </button>
        </div>
      ))}
    </div>
  );
};
