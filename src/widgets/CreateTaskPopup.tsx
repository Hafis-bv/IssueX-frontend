"use client";

import { Button } from "@/components/Button";
import { useProjects } from "@/context/projectContext";
import { useTasks } from "@/context/taskContext";
import { taskSchema } from "@/schemas/task";
import { TaskError } from "@/types/task";
import { useState } from "react";
import z from "zod";

interface CreateTaskPopupProps {
  onClose: () => void;
}

export const CreateTaskPopup = ({ onClose }: CreateTaskPopupProps) => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { projects } = useProjects();
  const [projectId, setProjectId] = useState("");
  const [errors, setErrors] = useState<TaskError>({
    title: null,
    description: null,
    projectId: null,
  });

  async function handleSubmit() {
    const result = taskSchema.safeParse({ title, description, projectId });
    if (!result.success) {
      const flattened = z.flattenError(result.error);
      const fieldErrors = flattened.fieldErrors;

      setErrors({
        title: fieldErrors.title?.[0] ?? null,
        description: fieldErrors.description?.[0] ?? null,
        projectId: fieldErrors.projectId?.[0] ?? null,
      });
      return;
    }

    await addTask({
      title,
      description,
      projectId,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-[#1a1d24] bg-[#0d111a]">
        <div className="flex items-center justify-between border-b border-[#1a1d24] px-5 py-4">
          <h1 className="text-sm font-medium text-zinc-100">Create task</h1>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-md px-2 p-1 text-zinc-400 transition hover:bg-[#111622] hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Task title..."
              className="w-full rounded-xl border border-[#1a1d24] bg-[#080b13] px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.title && (
              <span className="text-red-600 text-xs mt-1">{errors.title}</span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description..."
              rows={5}
              className="w-full resize-none rounded-xl border border-[#1a1d24] bg-[#080b13] px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.description && (
              <span className="text-red-600 text-xs mt-1">
                {errors.description}
              </span>
            )}
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Select project
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full rounded-xl border border-[#1a1d24] bg-[#080b13] px-3 py-2.5 text-sm text-zinc-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
            >
              <option value="">Select project</option>

              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name || "Untitled"}
                </option>
              ))}
            </select>
            {errors.projectId && (
              <span className="text-red-600 text-xs mt-1">
                {errors.projectId}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-[#1a1d24] px-5 py-4">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-[#1a1d24] bg-transparent px-4 py-2 text-sm font-medium text-zinc-400 transition hover:bg-[#111622] hover:text-white"
          >
            Cancel
          </button>

          <Button
            onClick={handleSubmit}
            className="!rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Create task
          </Button>
        </div>
      </div>
    </div>
  );
};
