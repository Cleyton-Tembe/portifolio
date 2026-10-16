import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  contacts,
  education,
  profile,
  talents,
  type Contact,
} from "../data/profile";
import { projects } from "../data/projects";
import { branches } from "../data/skills";
import { rarities } from "../data/rarity";
import { href } from "../routes";
import { Icon, type IconName } from "../components/Icon";
import { PanelTitle, SectionTitle } from "../components/ui";

// Ficha de personagem: CV (atributos, equipamento = formação, passivas =
// competências pessoais) e contacto ("Convidar para o grupo").

const contactIcon: Record<Contact["id"], IconName> = {
  email: "mail",
  phone: "phone",
  whatsapp: "chat",
  github: "github",
};

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.45, ease: [0.2, 0.7, 0.2, 1] as const },
});

function Avatar() {
  return (
    <div className="relative mx-auto aspect-square w-44 sm:w-52">
      <svg
        viewBox="0 0 200 200"
        className="spin-slow absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="#22d3ee"
          strokeOpacity="0.55"
          strokeDasharray="4 8"
        />
      </svg>
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="avatar-hex">
            <path d="M100 18l71 41v82l-71 41-71-41V59z" />
          </clipPath>
          <linearGradient id="avatar-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#16303a" />
            <stop offset="1" stopColor="#0d141c" />
          </linearGradient>
        </defs>
        <path
          d="M100 18l71 41v82l-71 41-71-41V59z"
          fill="url(#avatar-fill)"
          stroke="#22d3ee"
          strokeWidth="2.5"
        />
        {profile.photo ? (
          <image
            href={profile.photo}
            x="29"
            y="18"
            width="142"
            height="164"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#avatar-hex)"
          />
        ) : (
          <text
            x="100"
            y="117"
            textAnchor="middle"
            fill="#f1f4f8"
            style={{ font: '800 50px "Exo 2", sans-serif' }}
          >
            {profile.initials}
          </text>
        )}
      </svg>
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-accent px-3 py-0.5 font-mono text-sm font-bold text-accent-ink">
        NÍVEL {String(profile.level).padStart(2, "0")}
      </span>
    </div>
  );
}

export function Character({ focus }: { focus?: string }) {
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (focus === "contacto")
      contactRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }, [focus]);

  const skillCount = branches.reduce((n, b) => n + b.skills.length, 0);

  return (
    <div>
      <SectionTitle kicker="Ficha de personagem" title="Personagem" />

      <div className="grid gap-5 lg:grid-flow-dense lg:grid-cols-12">
        <motion.section
          {...rise()}
          className="panel brackets p-5 lg:col-span-4 lg:self-start"
          aria-label="Ficha da personagem"
        >
          <Avatar />
          <div className="mt-7 text-center">
            <h2 className="text-3xl font-extrabold uppercase">
              {profile.callsign}
            </h2>
            <p className="text-lg font-semibold text-accent">{profile.role}</p>
          </div>
          <dl className="mt-6 divide-y divide-line border-y border-line">
            {[
              ["Nome", profile.name],
              ["Area", profile.role],
              ["Universidade", profile.faction],
              ["Região", profile.location],
              ["Progresso", profile.levelLabel],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <dt className="label shrink-0">{k}</dt>
                <dd className="text-right text-base font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 grid grid-cols-3 gap-4 text-center">
            {[
              [projects.length, "Projectos", href("inventario")],
              [skillCount, "Habilidades", href("habilidades")],
              [branches.length, "Ramos", href("habilidades")],
            ].map(([n, label, link]) => (
              <a
                key={label}
                href={String(link)}
                className="rounded-lg border border-line bg-white/[0.04] py-3 transition-colors hover:border-accent"
              >
                <span className="block font-mono text-2xl font-bold text-accent">
                  {n}
                </span>
                <span className="block text-[13px] font-semibold text-muted">
                  {label}
                </span>
              </a>
            ))}
          </div>
          <a
            href={profile.cv}
            download
            className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-accent py-3 font-bold uppercase tracking-wide text-accent-ink"
          >
            <Icon name="download" size={18} />
            Ver CV
          </a>
        </motion.section>

        <motion.section
          {...rise(0.1)}
          ref={contactRef}
          id="contacto"
          className="panel scroll-mt-24 p-5 lg:col-span-7 lg:col-start-10 lg:self-start"
          aria-label="Contacto"
        >
          <PanelTitle>Contacto</PanelTitle>
          <ul className="flex flex-col gap-4">
            {contacts.map((c) => (
              <li key={c.id}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-line bg-white/4 p-3 transition-colors hover:border-accent hover:bg-accent/10"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent">
                    <Icon name={contactIcon[c.id]} size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-bold">
                      {c.label}
                    </span>
                    <span className="block break-all text-sm text-muted">
                      {c.value}
                    </span>
                  </span>
                  <Icon
                    name="chevron"
                    size={18}
                    className="ml-auto shrink-0 text-dim transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </a>
              </li>
            ))}
          </ul>
        </motion.section>

        <div className="flex flex-col gap-5 lg:col-span-5 lg:col-start-5 lg:row-span-2 lg:row-start-1">
          <motion.section
            {...rise(0.15)}
            className="panel p-5"
            aria-label="Biografia"
          >
            <PanelTitle>Biografia</PanelTitle>
            <p className="text-[17px] leading-relaxed text-muted">
              {profile.bio}
            </p>
          </motion.section>

          <motion.section
            {...rise(0.2)}
            className="panel p-5"
            aria-label="Formação"
          >
            <PanelTitle>Educacao</PanelTitle>
            <ul className="flex flex-col gap-3">
              {education.map((e) => (
                <li
                  key={e.title}
                  className="relative overflow-hidden rounded-lg border border-line bg-white/4 p-4 pl-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <span className="font-mono text-sm text-muted">
                      {e.period}
                    </span>
                  </div>
                  <p className="mt-1 text-lg font-bold leading-snug">
                    {e.title}
                  </p>
                  <p className="text-[15px] text-muted">{e.org}</p>
                  <p className="mt-1 text-[15px] text-dim">{e.detail}</p>
                </li>
              ))}
            </ul>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
