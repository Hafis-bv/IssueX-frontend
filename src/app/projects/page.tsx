import { Metadata } from "next";
import ProjectsList from "./widgets/ProjectsList";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "View and manage your projects in IssueX. Track issues, organize tasks, and collaborate efficiently in one place.",
};

export default async function Projects() {
  return (
    <div>
      <ProjectsList />
    </div>
  );
}
