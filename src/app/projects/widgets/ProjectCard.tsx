"use client";

import { Project } from "@/types/project";
import API from "@/utils/api";
import { GrClose } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { useAuth } from "@/context/userContext";
import { getRandomColor } from "@/utils/getRandomColor";

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
  const color = useMemo(() => {
    return getRandomColor();
  }, []);
  return (
    <li className="flex items-center justify-between bg-white shadow-sm rounded-md p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-3">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        ></span>
        {creatingProjectId === project.id ? (
          <input
            autoFocus
            className="border border-gray-800 text-black py-1 px-2 rounded-md outline-none"
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
            className="border border-gray-800 text-black py-1 px-2 rounded-md outline-none"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") updateProject(project.id);
              if (e.key === "Escape") setEditingId(null);
            }}
          />
        ) : (
          <span className="text-gray-800 font-medium truncate max-w-50">
            {project.name}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 text-black">
        <span
          className="cursor-pointer"
          onClick={() => deleteProject(project.id)}
        >
          <GrClose size={20} />
        </span>
        <span
          onClick={() => setEditingId(project.id)}
          className="cursor-pointer"
        >
          <MdEdit size={20} />
        </span>
        <span className="text-gray-400 text-sm">#{project.id.slice(0, 6)}</span>
      </div>
    </li>
  );
};
