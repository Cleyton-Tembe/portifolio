import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  projects,
  projectTypes,
  type Project,
  type ProjectFilter,
} from "../data/projects";
import { rarities, rarityOrder } from "../data/rarity";
import { navigate } from "../routes";
import { isTyping, useIsDesktop } from "../hooks";
import { Icon, type IconName } from "../components/Icon";
import { BottomSheet, Chip, PanelTitle, SectionTitle } from "../components/ui";

// Inventário de jogo: grelha de itens com cor de raridade
// e painel de detalhes (no celular, um painel que sobe de baixo).

const CAPACITY = 100;

const typeIcon: Record<Project["type"], IconName> = {
  "Full-Stack": "layers",
  "Front-end": "code",
  "Back-end": "server",
  DevOps: "pipeline",
};

const sorted = [...projects].sort(
  (a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity),
);

function ItemCard({
  p,
  selected,
  onClick,
}: {
  p: Project;
  selected: boolean;
  onClick: () => void;
}) {
  const color = rarities[p.rarity].color;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-xl border bg-panel-solid p-3.5 text-left transition-colors sm:p-4 ${
        selected ? "border-white" : "border-line hover:border-line-strong"
      }`}
      style={
        selected
          ? { boxShadow: `0 0 0 4px ${color}, 0 0 28px -6px ${color}` }
          : undefined
      }
    >
      <Icon
        name={typeIcon[p.type]}
        size={72}
        className="absolute -bottom-3 -right-3 opacity-[0.07] transition-transform duration-300 group-hover:scale-110"
      />
      <span className="relative flex items-start justify-between gap-2">
        <span
          className="text-[13px] font-bold uppercase tracking-wider"
          style={{ color }}
        >
          {rarities[p.rarity].label}
        </span>
        <Icon
          name={typeIcon[p.type]}
          size={18}
          className="shrink-0 text-muted"
        />
      </span>
      <span className="relative mt-2 text-lg font-extrabold leading-tight sm:text-xl">
        {p.name}
      </span>
      <span className="relative mt-auto flex items-center justify-between gap-2 pt-3 text-sm font-semibold text-muted">
        <span>{p.type}</span>
        <span>{p.year}</span>
      </span>
    </button>
  );
}

function ItemDetail({ p }: { p: Project }) {
  const color = rarities[p.rarity].color;
  return (
    <div>
      <div
        className="-mx-5 -mt-5 mb-5 border-b border-line px-5 py-4 max-lg:mx-0 max-lg:mt-0 max-lg:px-0"
        style={{
          background: `linear-gradient(90deg, color-mix(in srgb, ${color} 22%, transparent), transparent)`,
        }}
      >
        <p
          className="text-sm font-bold uppercase tracking-wider"
          style={{ color }}
        >
          {rarities[p.rarity].label} · {p.type}
        </p>
        <h2 className="mt-1 pr-8 text-3xl font-extrabold leading-tight">
          {p.name}
        </h2>
      </div>

      <p className="text-[17px] text-muted">{p.desc}</p>

      <div className="mt-5">
        <PanelTitle>Funcionalidades</PanelTitle>
        <ul className="space-y-1.5">
          {p.talents.map((t) => (
            <li key={t} className="flex gap-2.5 text-base font-medium">
              <span
                className="mt-[7px] h-2 w-2 shrink-0 rotate-45"
                style={{ background: color }}
              />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <PanelTitle>Tecnologias</PanelTitle>
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        {p.repo ? (
          <a
            href={p.repo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-accent py-3 font-bold uppercase tracking-wide text-accent-ink transition-colors hover:bg-accent-soft"
          >
            <Icon name="github" size={18} />
            Ver repositório
          </a>
        ) : (
          <span className="flex items-center justify-center gap-2 rounded-lg border border-line py-3 font-bold uppercase tracking-wide text-muted">
            <Icon name="lock" size={18} />
            {p.note ?? "Sem link público"}
          </span>
        )}
        {p.demo && (
          <a
            href={p.demo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-accent py-3 font-bold uppercase tracking-wide text-accent transition-colors hover:bg-accent/10"
          >
            <Icon name="external" size={18} />
            Ver demo
          </a>
        )}
      </div>
    </div>
  );
}

export function Inventory({ focus }: { focus?: string }) {
  const desktop = useIsDesktop();
  const [filter, setFilter] = useState<ProjectFilter>("Todos");
  const items = useMemo(
    () =>
      filter === "Todos" ? sorted : sorted.filter((p) => p.type === filter),
    [filter],
  );
  const current = projects.find((p) => p.id === focus);
  const selected = current ?? items[0];
  const [sheet, setSheet] = useState(!!current);

  // um link directo (#/inventario/<id>) abre logo o item
  useEffect(() => {
    if (current) setSheet(true);
  }, [current]);

  const select = (p: Project) => {
    navigate("inventario", p.id, true);
    if (!desktop) setSheet(true);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e) || (e.key !== "ArrowLeft" && e.key !== "ArrowRight"))
        return;
      const i = items.findIndex((p) => p.id === selected?.id);
      const n =
        (i + (e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
      navigate("inventario", items[n].id, true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items, selected]);

  return (
    <div>
      <SectionTitle kicker="Projectos" title="Inventário" />

      <div
        data-noswipe
        className="no-scrollbar -mx-4 mb-5 flex gap-1 overflow-x-auto px-4 lg:mx-0 lg:px-0"
      >
        {projectTypes.map((t) => {
          const count =
            t === "Todos"
              ? projects.length
              : projects.filter((p) => p.type === t).length;
          const on = t === filter;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              aria-pressed={on}
              className={`shrink-0 rounded-lg px-4 py-2 text-[15px] font-bold transition-colors ${
                on
                  ? "bg-accent text-accent-ink"
                  : "bg-white/[0.05] text-muted hover:text-ink"
              }`}
            >
              {t}
              <span className="ml-1.5 font-mono text-[13px] opacity-80">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <motion.ul
          layout
          className="grid content-start self-start grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 xl:grid-cols-4"
          aria-label="Itens"
        >
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25, delay: i * 0.025 }}
                className="h-[150px] sm:h-[170px]"
              >
                <ItemCard
                  p={p}
                  selected={desktop && p.id === selected?.id}
                  onClick={() => select(p)}
                />
              </motion.li>
            ))}
          </AnimatePresence>
          {/* slots vazios, para dar a sensação de mochila */}
          {Array.from(
            { length: Math.max(0, (desktop ? 8 : 4) - items.length) },
            (_, i) => (
              <li
                key={`empty-${i}`}
                className="h-[150px] rounded-xl border border-dashed border-line sm:h-[170px]"
                aria-hidden="true"
              />
            ),
          )}
        </motion.ul>

        <aside
          className="panel brackets sticky top-24 hidden self-start overflow-hidden p-5 lg:block"
          aria-live="polite"
        >
          {selected && (
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ItemDetail p={selected} />
              </motion.div>
            </AnimatePresence>
          )}
        </aside>
      </div>

      <BottomSheet
        open={sheet && !desktop && !!current}
        onClose={() => {
          setSheet(false);
          navigate("inventario", undefined, true);
        }}
        label={selected?.name ?? "Item"}
      >
        {selected && <ItemDetail p={selected} />}
      </BottomSheet>
    </div>
  );
}
