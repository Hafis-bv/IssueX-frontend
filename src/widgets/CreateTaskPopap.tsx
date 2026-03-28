"use client";

// import { z } from "zod";
import { Button } from "@/components/Button";
import { useProjects } from "@/context/projectContext";
import { useTasks } from "@/context/taskContext";
import { useAuth } from "@/context/userContext";
import { useState } from "react";

interface CreateTaskPopapProps {
  onClose: () => void;
}

export const CreateTaskPopap = ({ onClose }: CreateTaskPopapProps) => {
  const { user } = useAuth();
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { projects } = useProjects();
  const [projectId, setProjectId] = useState("");
  // const createTaskSchema = z.object({
  //   title: z.string().min(1, "Title is required"),
  //   description: z.string().min(1, "Description is required"),
  //   projectId: z.string().uuid("Invalid project id"),
  // });

  async function handleSubmit() {
    if (!user || !projectId) return;

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
