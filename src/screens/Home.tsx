import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { branches } from "../data/skills";
import { href } from "../routes";
import { isTyping } from "../hooks";
import { Icon } from "../components/Icon";
import { PanelTitle } from "../components/ui";

const skillCount = branches.reduce((n, b) => n + b.skills.length, 0);

const menu = [
  {
    label: "Continuar",
    desc: "Abre a ficha da personagem: perfil, formação e CV.",
    href: href("personagem"),
  },
  {
    label: "Habilidades",
    desc: `${skillCount} habilidades em ${branches.length} ramos.`,
    href: href("habilidades"),
  },
  {
    label: "Inventário",
    desc: `${projects.length} projectos, do front-end ao DevOps.`,
    href: href("inventario"),
  },
  {
    label: "Contacto",
    desc: "Email, telefone, WhatsApp e GitHub.",
    href: href("personagem", "contacto"),
  },
  {
    label: "Ver CV",
    desc: "O currículo completo em PDF.",
    href: profile.cv,
    download: true,
  },
];

export function Home() {
  const [sel, setSel] = useState(0);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e)) return;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setSel((s) => {
          const n =
            (s + (e.key === "ArrowDown" ? 1 : -1) + menu.length) % menu.length;
          refs.current[n]?.focus();
          return n;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="grid items-center gap-10 lg:min-h-[calc(100dvh-10rem)] lg:grid-cols-12">
      <div className="lg:col-span-7">
        <motion.h1
          className="mt-2 text-[clamp(3rem,9vw,6.5rem)] font-extrabold uppercase leading-[0.9] tracking-[0.02em]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Cleyton
          <br />
          <span className="text-accent">Tembe</span>
        </motion.h1>
        <p className="mt-4 max-w-lg text-xl font-medium text-muted">
          {profile.title} - {profile.role}
        </p>

        <nav aria-label="Menu do jogo" className="mt-10 max-w-md">
          <ul className="flex flex-col gap-1.5">
            {menu.map((m, i) => {
              const active = i === sel;
              return (
                <motion.li
                  key={m.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <a
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    href={m.href}
                    download={m.download ? "" : undefined}
                    onMouseEnter={() => setSel(i)}
                    onFocus={() => setSel(i)}
                    className={`relative isolate flex items-center gap-3 rounded-lg px-5 py-3 text-2xl font-extrabold uppercase tracking-[0.04em] transition-colors sm:text-[28px] ${
                      active ? "text-accent-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="menu-bg"
                        className="absolute inset-0 -z-10 rounded-lg bg-accent shadow-[0_0_30px_rgb(34_211_238/0.35)]"
                        transition={{
                          type: "spring",
                          stiffness: 600,
                          damping: 42,
                        }}
                      />
                    )}
                    <span
                      className={`text-lg transition-opacity ${active ? "opacity-100" : "opacity-0"}`}
                      aria-hidden="true"
                    >
                      ▶
                    </span>
                    {m.label}
                    {m.download && (
                      <Icon name="download" size={22} className="ml-auto" />
                    )}
                  </a>
                </motion.li>
              );
            })}
          </ul>
          <p
            className="mt-4 min-h-[1.6em] px-5 text-lg font-medium text-muted"
            aria-live="polite"
          >
            {menu[sel].desc}
          </p>
        </nav>
      </div>

      <div className="flex flex-col gap-5 lg:col-span-5">
        <motion.section
          className="panel brackets p-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          aria-label="Perfil do jogador"
        >
          <div className="flex items-center gap-4">
            <div className="min-w-0">
              <p className="truncate text-2xl font-extrabold uppercase">
                {profile.callsign}
              </p>
              <p className="text-base font-semibold text-accent">
                {profile.role}
              </p>
            </div>
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-3">
            {[
              ["Região", profile.location],
              ["Progresso", profile.levelLabel],
              ["Projectos", String(projects.length)],
              ["Habilidades", String(skillCount)],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-white/[0.05] px-3 py-2.5">
                <dt className="label">{k}</dt>
                <dd className="mt-0.5 text-[17px] font-bold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </motion.section>
      </div>
    </div>
  );
}
