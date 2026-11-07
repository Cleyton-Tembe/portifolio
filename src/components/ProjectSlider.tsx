import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "../data/site";
import ProjectCard from "./ProjectCard";

export default function ProjectSlider({ projects }: { projects: Project[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => {
    const el = track.current;
    const slide = el?.children[i] as HTMLElement | undefined;
    if (el && slide)
      el.scrollTo({
        left: slide.offsetLeft - el.offsetLeft,
        behavior: "smooth",
      });
  };

  const onScroll = () => {
    const el = track.current;
    if (!el || !el.children[0]) return;
    const width = (el.children[0] as HTMLElement).offsetWidth;
    setIndex(Math.round(el.scrollLeft / width));
  };

  const arrow =
    "grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink disabled:cursor-default disabled:opacity-35";

  return (
    <div>
      <ul
        ref={track}
        onScroll={onScroll}
        aria-label="Projects"
        className="relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 scrollbar-none sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-8 sm:gap-y-14 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p) => (
          <li key={p.slug} className="w-[85%] shrink-0 snap-center sm:w-auto">
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>

      {/* slider controls, phones only */}
      <div className="mt-6 flex items-center justify-between sm:hidden">
        <button
          type="button"
          aria-label="Previous project"
          className={arrow}
          disabled={index === 0}
          onClick={() => goTo(index - 1)}
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <div className="flex gap-2">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              aria-label={`Show ${p.title}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className="grid size-6 cursor-pointer place-items-center"
            >
              <span
                className={`block h-2 rounded-full transition-all ${i === index ? "w-6 bg-pink" : "w-2 bg-line"}`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="Next project"
          className={arrow}
          disabled={index === projects.length - 1}
          onClick={() => goTo(index + 1)}
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
