"use client";

import { Project } from "@/types/project";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./userContext";
import API from "@/utils/api";

interface ProjectsContext {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  loading: boolean;
  error: string | null;
  creatingProjectId: string | null;
  setCreatingProjectId: React.Dispatch<React.SetStateAction<string | null>>;
  editingId: string | null;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
  newName: string;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  addTempProject: () => void;
  deleteProject: (id: string) => Promise<void>;
  updateProject: (id: string) => Promise<void>;
}

interface ProjectProviderProps {
  children: ReactNode;
}

const projectsContext = createContext<ProjectsContext | undefined>(undefined);

export default function ProjectProvider({ children }: ProjectProviderProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creatingProjectId, setCreatingProjectId] = useState<string | null>(
    null,
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>("");

  const { user } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!user) return;
        const data = await API.handleUserProject(user.id);
        setProjects(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching projects:", err);
        setError(err.message || "Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Add a temporary project to the list
  const addTempProject = () => {
    const tempId = "temp-" + Date.now();
    setProjects((prev) => [{ id: tempId, name: "" }, ...prev]);
    setCreatingProjectId(tempId);
  };

  // Delete a project from the list
  const deleteProject = async (id: string) => {
    try {
      await API.handleDeleteProject(id);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // Update a project in the list
  const updateProject = async (id: string) => {
    try {
      if (!newName.trim()) return;
      await API.handleUpdateProject(id, newName);
      setProjects(
        projects.map((project) =>
          project.id === id ? { ...project, name: newName } : project,
        ),
      );
      setEditingId(null);
      setNewName("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <projectsContext.Provider
        value={{
          projects,
          setProjects,
          loading,
          error,
          creatingProjectId,
          setCreatingProjectId,
          editingId,
          setEditingId,
          newName,
          setNewName,
          addTempProject,
          deleteProject,
          updateProject,
        }}
      >
        {children}
      </projectsContext.Provider>
    </div>
  );
}

export const useProjects = () => {
  const context = useContext(projectsContext);

  if (!context) throw new Error("useAuth must be used within a user");

  return context;
};
