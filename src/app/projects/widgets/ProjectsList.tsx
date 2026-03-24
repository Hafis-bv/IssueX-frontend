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
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-zinc-100">Projects</h1>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#0d111a] border border-[#1a1d24] text-zinc-100 placeholder:text-zinc-500 px-4 py-2.5 rounded-xl outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            disabled={Boolean(creatingProjectId)}
            onClick={addTempProject}
            className="py-2.5 px-5 rounded-xl text-white transition hover:bg-transparent hover:border-primary hover:text-primary border border-transparent"
          >
            Add new project
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-3 rounded-xl mb-4 text-center">
          {error}
        </div>
      )}

      {filteredProjects.length === 0 && !error ? (
        <div className="text-zinc-500 text-center py-10 border border-dashed border-[#1a1d24] rounded-xl bg-[#0d111a]">
          No projects available.
        </div>
      ) : (
        <ul className="space-y-3">
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
