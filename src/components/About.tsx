import { beyondCode, facts, toolbox } from "../data/site";
import SectionLabel from "./SectionLabel";
import TechIcon from "./TechIcon";

export default function About() {
  return (
    <section id="about" className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[6fr_5fr] lg:gap-20">
        <div>
          <SectionLabel>about me</SectionLabel>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            I learn by building
          </h2>
          <div className="mt-6 max-w-[62ch] space-y-4 text-lg text-ink-soft">
            <p>
              I'm Cleyton, a third-year Computer Engineering student at Eduardo
              Mondlane University in Maputo. Alongside my degree I completed a
              full-stack web development course, and I've been building complete
              apps ever since.
            </p>
            <p>
              My degree gives me the part you don't see in a demo: how to gather
              requirements, model a system and design a database before writing
              the first line of code.
            </p>
          </div>

          <h3 className="mt-10 font-display text-xl font-bold">
            Beyond the code
          </h3>
          <ul className="mt-4 space-y-2 text-ink-soft">
            {beyondCode.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-pink"
                />
                {item}
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-display text-xl font-bold">Tools I use</h3>
          <ul className="mt-4 flex flex-wrap gap-3" aria-label="Tools I use">
            {toolbox.map((t) => (
              <li key={t}>
                <TechIcon name={t} />
              </li>
            ))}
          </ul>
        </div>

        <aside
          aria-labelledby="facts-title"
          className="self-start rounded-3xl border border-line bg-paper p-6 sm:p-8"
        >
          <h3 id="facts-title" className="font-display text-xl font-bold">
            At a glance
          </h3>
          <dl className="mt-5 divide-y divide-line">
            {facts.map((f) => (
              <div key={f.label} className="py-3.5">
                <dt className="font-mono text-sm text-ink-soft">{f.label}</dt>
                <dd className="mt-1 font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
