import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { journey } from "../data/site";
import SectionLabel from "./SectionLabel";

export default function Journey() {
  const [open, setOpen] = useState<number | null>(journey.length - 1);

  return (
    <section
      id="journey"
      className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <SectionLabel>journey</SectionLabel>
      <h2 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        How I got here
      </h2>

      <ol className="mt-10 border-l-2 border-line">
        {journey.map((step, i) => {
          const isOpen = open === i;
          const panelId = `journey-panel-${i}`;
          return (
            <li key={step.title} className="relative pl-6 sm:pl-8">
              {/* dot on the timeline */}
              <span
                aria-hidden="true"
                className={`absolute top-6 -left-2.25 size-4 rounded-full border-2 border-paper transition-colors ${
                  isOpen ? "bg-pink" : "bg-line"
                }`}
              />
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full cursor-pointer items-start justify-between gap-4 rounded-lg py-4 text-left"
                >
                  <span>
                    <span className="block font-mono text-sm text-ink-soft">
                      {step.when}
                    </span>
                    <span className="mt-1 block font-display text-xl font-bold sm:text-2xl">
                      {step.title}
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`mt-6 size-5 shrink-0 text-ink-soft transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6">
                      <p className="max-w-[62ch] text-ink-soft">{step.body}</p>
                      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                        {step.links.map((l) => (
                          <li key={l.href}>
                            <a
                              href={l.href}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex min-h-11 items-center font-semibold text-violet underline-offset-4 hover:underline"
                            >
                              {l.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
