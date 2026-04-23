// Server wrapper: fetches Projects via Payload facade, hands to client island.
import { fetchProjects } from "@/lib/cms-server";
import ProjectsClient from "./ProjectsClient";

export default async function Projects() {
  const projects = await fetchProjects();
  return <ProjectsClient projects={projects} />;
}
