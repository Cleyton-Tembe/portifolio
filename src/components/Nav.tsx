import { motion } from "motion/react";
import { screens, href, type ScreenId } from "../routes";
import { profile } from "../data/profile";
import { useClock } from "../hooks";
import { Icon, type IconName } from "./Icon";

const icons: Record<ScreenId, IconName> = {
  inicio: "home",
  personagem: "agent",
  habilidades: "skills",
  inventario: "inventory",
};

function Emblem() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 3l11 6.5v13L16 29 5 22.5v-13z"
        fill="rgb(34 211 238 / 0.12)"
        stroke="#22d3ee"
        strokeWidth="2"
      />
      <text
        x="16"
        y="20.5"
        textAnchor="middle"
        fill="#f1f4f8"
        style={{ font: '800 11px "Exo 2", sans-serif' }}
      >
        {profile.initials}
      </text>
    </svg>
  );
}

/** Barra de separadores do topo, como num menu de consola: LB [ … ] RB. */
export function TopNav({
  current,
  onStep,
}: {
  current: ScreenId;
  onStep: (dir: -1 | 1) => void;
}) {
  const time = useClock();
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 lg:h-[72px] lg:px-8">
        <a href={href("inicio")} className="flex min-w-0 items-center gap-3">
          <Emblem />
          <span className="truncate text-lg font-bold uppercase tracking-[0.08em]">
            {profile.callsign}
          </span>
        </a>

        <nav
          aria-label="Menu principal"
          className="mx-auto hidden items-center gap-1.5 lg:flex"
        >
          <button
            type="button"
            onClick={() => onStep(-1)}
            className="keycap mr-2 hover:border-accent"
            aria-label="Separador anterior (Q)"
          >
            Q
          </button>
          {screens.map((s) => {
            const active = s.id === current;
            return (
              <a
                key={s.id}
                href={href(s.id)}
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center gap-2 rounded-md px-4 py-2 text-base font-bold uppercase tracking-[0.06em] transition-colors ${
                  active
                    ? "text-accent-ink"
                    : "text-muted hover:bg-white/5 hover:text-ink"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-md bg-accent shadow-[0_0_24px_rgb(34_211_238/0.45)]"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <Icon name={icons[s.id]} size={18} className="relative" />
                <span className="relative">{s.label}</span>
              </a>
            );
          })}
          <button
            type="button"
            onClick={() => onStep(1)}
            className="keycap ml-2 hover:border-accent"
            aria-label="Próximo separador (E)"
          >
            E
          </button>
        </nav>

        <div className="ml-auto flex items-center gap-3 font-mono text-sm text-muted lg:ml-0">
          <span className="hidden items-center gap-1.5 sm:flex">
            <Icon name="pin" size={16} className="text-accent" />
            Maputo
          </span>
          <span className="font-bold text-ink">{time}</span>
        </div>
      </div>
    </header>
  );
}

/** No celular o menu desce para uma barra inferior com ícones. */
export function BottomNav({ current }: { current: ScreenId }) {
  return (
    <nav
      aria-label="Menu principal"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {screens.map((s) => {
          const active = s.id === current;
          return (
            <li key={s.id}>
              <a
                href={href(s.id)}
                aria-current={active ? "page" : undefined}
                className={`relative flex flex-col items-center gap-1 py-2.5 text-[13px] font-bold ${active ? "text-accent" : "text-muted"}`}
              >
                {active && (
                  <motion.span
                    layoutId="bottom-tab"
                    className="absolute inset-x-5 top-0 h-[3px] rounded-b bg-accent"
                  />
                )}
                <Icon name={icons[s.id]} size={22} />
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const hints: Record<ScreenId, [string, string][]> = {
  inicio: [
    ["↑↓", "Navegar"],
    ["Enter", "Selecionar"],
    ["Q/E", "Separador"],
  ],
  personagem: [
    ["Q/E", "Separador"],
    ["Esc", "Voltar"],
  ],
  habilidades: [
    ["←→", "Ramo"],
    ["Q/E", "Separador"],
    ["Esc", "Voltar"],
  ],
  inventario: [
    ["←→", "Item"],
    ["Q/E", "Separador"],
    ["Esc", "Voltar"],
  ],
};

/** Dicas de botões no rodapé, como nos menus de consola. */
export function HintBar({ current }: { current: ScreenId }) {
  return (
    <footer className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full mx-auto hidden max-w-7xl items-center justify-between px-8 pb-6 pt-2 lg:flex">
      <div className="flex items-center gap-6">
        {hints[current].map(([k, label]) => (
          <span
            key={label}
            className="flex items-center gap-2 text-[15px] font-medium text-muted"
          >
            <span className="keycap">{k}</span>
            {label}
          </span>
        ))}
      </div>
      <span className="text-sm text-dim">
        © {new Date().getFullYear()} {profile.name}
      </span>
    </footer>
  );
}
