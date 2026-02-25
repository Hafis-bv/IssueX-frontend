import API from "@/utils/api";
import ProjectsList from "@/widgets/ProjectsList";

export default async function Projects() {
  const projects = await API.handleAllProjects();
  console.log(projects);
  return (
    <div>
      <ProjectsList />
    </div>
  );
}
