import { featured, projects } from "../data/site";
import ProjectShot from "./ProjectShot";
import ProjectStack from "./ProjectStack";
import ProjectLinks from "./ProjectLinks";
import ProjectSlider from "./ProjectSlider";
import SectionLabel from "./SectionLabel";

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionLabel>selected work</SectionLabel>
      <h2 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">Things I've built</h2>
      <p className="mt-3 max-w-[60ch] text-ink-soft">Every project here is deployed. Open a demo and try it.</p>

      {/* featured project: big screenshot on the left, story on the right */}
      <article className="mt-12 grid items-center gap-8 lg:grid-cols-[7fr_5fr] lg:gap-12">
        {featured.demo ? (
          <a href={featured.demo} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
            <ProjectShot src={featured.image} title={featured.title} eager />
          </a>
        ) : (
          <ProjectShot src={featured.image} title={featured.title} eager />
        )}
        <div>
          <p className="font-mono text-sm text-ink-soft">Featured project</p>
          <h3 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">{featured.title}</h3>
          <p className="mt-4 text-lg text-ink-soft">{featured.summary}</p>
          <div className="mt-5">
            <ProjectStack stack={featured.stack} />
          </div>
          <div className="mt-4">
            <ProjectLinks project={featured} />
          </div>
        </div>
      </article>

      <hr className="my-16 border-line" />

      <h3 className="mb-8 font-display text-2xl font-bold">More projects</h3>
      <ProjectSlider projects={projects} />
    </section>
  );
}
