"use client";

import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/types/project";
import Fuse from "fuse.js";
import { ChangeEvent, useState } from "react";
import { GrClose } from "react-icons/gr";
import ProjectsList from "./ProjectsList";

// interface ProjectSearchProps {
//   projects: Project[];
// }

export const ProjectSearch = () => {
  const { projects } = useProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState<Project[]>(projects);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchData(projects);
      return;
    }

    const fuse = new Fuse(projects, {
      keys: ["name"],
      threshold: 0.3,
    });

    setSearchData(fuse.search(query).map((result) => result.item));
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchData(projects);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search..."
        />

        {searchQuery && (
          <button onClick={clearSearch}>
            <GrClose color="#fff" size={25} />
          </button>
        )}
      </div>
      {searchQuery && searchData.length === 0 ? (
        <h2>No results</h2>
      ) : (
        <ProjectsList />
      )}
    </div>
  );
};
