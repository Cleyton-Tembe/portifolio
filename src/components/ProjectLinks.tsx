import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/site";
import { GitHubIcon } from "./icons";

export default function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-violet underline-offset-4 hover:underline"
        >
          Open the live demo
          <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only">for {project.title} (opens in a new tab)</span>
        </a>
      )}
      <a
        href={project.code}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink-soft underline-offset-4 hover:text-ink hover:underline"
      >
        <GitHubIcon className="size-4" />
        Read the code
        <span className="sr-only">for {project.title} (opens in a new tab)</span>
      </a>
    </div>
  );
}
