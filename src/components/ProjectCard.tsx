import type { Project } from "../data/site";
import ProjectShot from "./ProjectShot";
import ProjectStack from "./ProjectStack";
import ProjectLinks from "./ProjectLinks";

export default function ProjectCard({ project }: { project: Project }) {
  const shot = <ProjectShot src={project.image} title={project.title} />;

  return (
    <article className="flex h-full flex-col">
      {project.demo ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          tabIndex={-1}
          aria-hidden="true"
        >
          {shot}
        </a>
      ) : (
        shot
      )}
      <h4 className="mt-5 font-display text-xl font-bold">{project.title}</h4>
      <p className="mt-2 flex-1 text-ink-soft">{project.summary}</p>
      <div className="mt-4">
        <ProjectStack stack={project.stack} />
      </div>
      <div className="mt-3">
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
