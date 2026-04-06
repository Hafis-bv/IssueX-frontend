"use client";

import { Container } from "@/components/Container";
import { TaskCard } from "@/components/TaskCard";
import { Droppable } from "@/components/Droppable";
import { useTasks } from "@/context/taskContext";
import { formatDate } from "@/utils/formateDate";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";

type TaskStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";

export const TaskList = () => {
  const { updateTask } = useTasks();
  return (
    <DragDropProvider
      onDragEnd={({ operation }) => {
        const source = operation.source;
        const target = operation.target;

        if (!source || !target) return;

        const taskId = String(source.id);
        const newStatus = String(target.id) as TaskStatus;
        const task = source.data?.task; // Хочу спрсить я понимаю это но просто для уточнения надо

        if (!task) return;
        if (task.status === newStatus) return;

        updateTask(taskId, {
          title: task.title,
          description: task.description,
          status: newStatus,
        });
      }}
    >
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 bg-[#080b13]">
        <Droppable id="TODO" className="flex flex-col gap-4">
          <h1 className="border border-[#1a1d24] bg-[#0d111a] rounded-xl px-4 py-3 text-sm font-medium tracking-wide text-zinc-200">
            To do
          </h1>
          <TaskCard status="TODO" />
        </Droppable>

        <Droppable id="IN_PROGRESS" className="flex flex-col gap-4">
          <h1 className="border border-[#1a1d24] bg-[#0d111a] rounded-xl px-4 py-3 text-sm font-medium tracking-wide text-zinc-200">
            In Progress
          </h1>
          <TaskCard status="IN_PROGRESS" />
        </Droppable>

        <Droppable id="IN_REVIEW" className="flex flex-col gap-4">
          <h1 className="border border-[#1a1d24] bg-[#0d111a] rounded-xl px-4 py-3 text-sm font-medium tracking-wide text-zinc-200">
            In Review
          </h1>
          <TaskCard status="IN_REVIEW" />
        </Droppable>

        <Droppable id="DONE" className="flex flex-col gap-4">
          <h1 className="border border-[#1a1d24] bg-[#0d111a] rounded-xl px-4 py-3 text-sm font-medium tracking-wide text-zinc-200">
            Done
          </h1>
          <TaskCard status="DONE" />
        </Droppable>
      </Container>
      <DragOverlay dropAnimation={null}>
        {(source) => {
          const task = source?.data?.task;
          if (!task) return null;

          return (
            <div className="group bg-[#0d111a] border border-[#1a1d24] rounded-xl p-4 opacity-95 shadow-2xl">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h1 className="text-sm font-medium text-zinc-100 mb-2 leading-snug truncate max-w-65">
                    {task.title}
                  </h1>
                  <p className="text-xs text-zinc-400 mb-3">
                    {formatDate(task.createdAt)}
                  </p>

                  <button className="text-xs px-2 py-1 rounded-md border border-[#2a2f3a] text-zinc-300 bg-[#111622]">
                    {task.status}
                  </button>
                </div>
              </div>
            </div>
          );
        }}
      </DragOverlay>
    </DragDropProvider>
  );
};
