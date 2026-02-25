"use client";
import { useState, useEffect } from "react";
import API from "@/utils/api";
import { CustomLoading } from "@/components/CustomLoading";
import { Project } from "@/types/project";

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <CustomLoading />;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold text-white mb-6">Projects</h1>
        <button className="bg-primary py-2 px-8 rounded-xl cursor-pointer">
          Add new project
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-800 border border-red-200 px-4 py-3 rounded mb-4 text-center">
          {error}
        </div>
      )}

      {projects.length === 0 && !error ? (
        <div className="text-gray-500 text-center py-10">
          No projects available.
        </div>
      ) : (
        <ul className="space-y-2">
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex items-center justify-between bg-white shadow-sm rounded-md p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {/* Colored indicator like Linear */}
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                <span className="text-gray-800 font-medium">
                  {project.name}
                </span>
              </div>
              <span className="text-gray-400 text-sm">
                #{project.id.slice(0, 6)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
