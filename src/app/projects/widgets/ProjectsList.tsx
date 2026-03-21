"use client";
import { CustomLoading } from "@/components/CustomLoading";
import { ProjectCard } from "./ProjectCard";
import { useState } from "react";
import { Button } from "@/components/Button";
import { useProjects } from "@/context/projectContext";

export default function ProjectsList() {
  const {
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
  } = useProjects();

  const [searchValue, setSearchValue] = useState("");

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  if (loading) return <CustomLoading />;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold text-white mb-6">Projects</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 p-2 rounded-2xl"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            disabled={Boolean(creatingProjectId)}
            onClick={addTempProject}
            className="py-2 px-8"
          >
            Add new project
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-800 border border-red-200 px-4 py-3 rounded mb-4 text-center">
          {error}
        </div>
      )}

      {filteredProjects.length === 0 && !error ? (
        <div className="text-gray-500 text-center py-10">
          No projects available.
        </div>
      ) : (
        <ul className="space-y-2">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              setProjects={setProjects}
              creatingProjectId={creatingProjectId}
              setCreatingProjectId={setCreatingProjectId}
              editingId={editingId}
              setEditingId={setEditingId}
              newName={newName}
              setNewName={setNewName}
              deleteProject={deleteProject}
              updateProject={updateProject}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
