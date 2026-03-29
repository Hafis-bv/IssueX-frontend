"use client";

import { useTasks } from "@/context/taskContext";
import { Task } from "@/types/task";
import { formatDate } from "@/utils/formateDate";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { MdCheck, MdDeleteOutline, MdEdit } from "react-icons/md";

interface TaskDetailsProps {
  onClose: () => void;
  task: Task;
}

export const TaskDetails = ({ onClose, task }: TaskDetailsProps) => {
  const { deleteTask, updateTask } = useTasks();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status);

  async function handleDelete() {
    try {
      await deleteTask(task.id);
      onClose();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdate() {
    try {
      await updateTask(task.id, {
        title,
        description,
        status,
      });

      setIsEditing(false);
      onClose();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-6">
      <div className="w-3xl mx-auto rounded-2xl border border-[#1a1d24] bg-[#0d111a] p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            {isEditing ? (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-[#1a1d24] bg-[#080b13] px-3 py-2 text-xl font-semibold text-zinc-100 outline-none"
              />
            ) : (
              <h1 className="text-xl font-semibold text-zinc-100 wrap-break-words">
                {task.title}
              </h1>
            )}
            <p className="text-sm text-zinc-400 mt-1">
              Created at: {formatDate(task.createdAt!)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <button
                onClick={handleUpdate}
                className="cursor-pointer rounded-md p-2 text-zinc-400 transition hover:bg-[#111622] hover:text-green-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <MdCheck size={25} />
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="cursor-pointer rounded-md p-2 text-zinc-400 transition hover:bg-[#111622] hover:text-white"
              >
                <MdEdit size={25} />
              </button>
            )}

            <button
              onClick={handleDelete}
              className="p-2 rounded-md text-zinc-400 hover:text-red-400 hover:bg-[#111622] transition cursor-pointer"
            >
              <MdDeleteOutline size={25} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-md text-zinc-400 hover:text-red-400 hover:bg-[#111622] transition cursor-pointer"
            >
              <GrClose size={25} />
            </button>
          </div>
        </div>

        <div>
          {isEditing ? (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-md border border-[#2a2f3a] bg-[#111622] px-3 py-2 text-sm text-zinc-300 outline-none cursor-pointer"
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="IN_REVIEW">IN_REVIEW</option>
              <option value="DONE">DONE</option>
            </select>
          ) : (
            <span className="rounded-md border border-[#2a2f3a] bg-[#111622] px-3 py-1 text-xs text-zinc-300">
              {status}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Description
          </p>
          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full rounded-xl border border-[#1a1d24] bg-[#080b13] p-4 text-sm leading-relaxed text-zinc-300 outline-none"
            />
          ) : (
            <div className="rounded-xl border border-[#1a1d24] bg-[#080b13] p-4 text-sm leading-relaxed text-zinc-300 wrap-break-words">
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
