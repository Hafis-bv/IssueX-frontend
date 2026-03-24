"use client";

import { Project } from "@/types/project";
import API from "@/utils/api";
import { GrClose } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { useAuth } from "@/context/userContext";

interface ProjectCardProps {
  project: Project;
  setProjects: Dispatch<SetStateAction<Project[]>>;
  creatingProjectId: string | null;
  setCreatingProjectId: Dispatch<SetStateAction<string | null>>;
  editingId: string | null;
  setEditingId: Dispatch<SetStateAction<string | null>>;
  newName: string;
  setNewName: Dispatch<SetStateAction<string>>;
  deleteProject: (id: string) => void;
  updateProject: (id: string) => void;
}

export const ProjectCard = ({
  project,
  setProjects,
  creatingProjectId,
  setCreatingProjectId,
  editingId,
  setEditingId,
  newName,
  setNewName,
  deleteProject,
  updateProject,
}: ProjectCardProps) => {
  const { user } = useAuth();
  return (
    <li className="flex items-center justify-between bg-[#0d111a] border border-[#1a1d24] rounded-xl px-4 py-3 hover:bg-[#111622] hover:border-[#2a2f3a] transition-all duration-200">
      <div className="flex items-center gap-3 min-w-0">
        <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
        {creatingProjectId === project.id ? (
          <input
            autoFocus
            className="border border-[#2a2f3a] bg-[#080b13] text-zinc-100 py-1.5 px-3 rounded-md outline-none placeholder:text-zinc-500"
            type="text"
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                const name = (e.target as HTMLInputElement).value.trim();
                if (!name) return;
                if (!user) return;

                try {
                  const { project } = await API.handleCreateProject({
                    name,
                    id: user.id,
                  });

                  setProjects((prev) =>
                    prev.map((p) => (p.id === creatingProjectId ? project : p)),
                  );

                  setCreatingProjectId(null);
                } catch (err) {
                  console.log(err);
                }
              } else if (e.key === "Escape") {
                setProjects((prev) => prev.filter((p) => p.id !== project.id));
                setCreatingProjectId(null);
              }
            }}
          />
        ) : editingId === project.id ? (
          <input
            autoFocus
            className="border border-[#2a2f3a] bg-[#080b13] text-zinc-100 py-1.5 px-3 rounded-md outline-none placeholder:text-zinc-500"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") updateProject(project.id);
              if (e.key === "Escape") setEditingId(null);
            }}
          />
        ) : (
          <span className="text-zinc-100 font-medium truncate max-w-50">
            {project.name}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 text-zinc-400">
        <span
          className="cursor-pointer hover:text-red-400 transition"
          onClick={() => deleteProject(project.id)}
        >
          <GrClose size={18} />
        </span>
        <span
          onClick={() => setEditingId(project.id)}
          className="cursor-pointer hover:text-white transition"
        >
          <MdEdit size={18} />
        </span>
        <span className="text-zinc-500 text-xs">#{project.id.slice(0, 6)}</span>
      </div>
    </li>
  );
};
