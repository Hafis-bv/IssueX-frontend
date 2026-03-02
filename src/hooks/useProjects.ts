import { Project } from "@/types/project";
import API from "@/utils/api";
import { useEffect, useState } from "react";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creatingProjectId, setCreatingProjectId] = useState<string | null>(
    null,
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>("");

  // Load all projects from database
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await API.handleAllProjects();
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

  return { projects, setProjects, loading, error, creatingProjectId, setCreatingProjectId, editingId, setEditingId, newName, setNewName, addTempProject, deleteProject, updateProject };
}