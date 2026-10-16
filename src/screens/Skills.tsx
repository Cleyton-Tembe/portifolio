import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  branches,
  MAX_LEVEL,
  maxPoints,
  totalPoints,
  type Branch,
  type Skill,
} from "../data/skills";
import { projects } from "../data/projects";
import { href } from "../routes";
import { isTyping, useIsDesktop } from "../hooks";
import { BottomSheet, Pips, PanelTitle, SectionTitle } from "../components/ui";

// Árvore de habilidades:
//  - hub circular com o total de pontos
//  - um separador por ramo
//  - cada ramo é uma árvore vertical de pré-requisitos, que no celular
//    continua legível porque cresce para baixo.

const allPoints = branches.reduce((n, b) => n + totalPoints(b), 0);
const allMax = branches.reduce((n, b) => n + maxPoints(b), 0);

function rowsOf(skills: Skill[]) {
  const byId = new Map(skills.map((s) => [s.id, s]));
  const depth = (s: Skill): number =>
    s.parent && byId.has(s.parent) ? 1 + depth(byId.get(s.parent)!) : 0;
  const rows: Skill[][] = [];
  for (const s of skills) (rows[depth(s)] ??= []).push(s);
  return rows;
}

/** Hub circular: um arco por ramo, preenchido conforme os pontos. */

function BranchButton({
  b,
  active,
  onClick,
}: {
  b: Branch;
  active: boolean;
  onClick: () => void;
}) {
  const pts = totalPoints(b);
  const max = maxPoints(b);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative w-full rounded-lg border p-3 text-left transition-colors ${
        active
          ? "border-accent bg-accent/15"
          : "border-line bg-white/[0.03] hover:border-line-strong"
      }`}
    >
      <span className="mt-0.5 block text-lg font-bold uppercase">{b.name}</span>
    </button>
  );
}

function SkillNode({
  s,
  selected,
  onSelect,
  nodeRef,
}: {
  s: Skill;
  selected: boolean;
  onSelect: () => void;
  nodeRef: (el: HTMLDivElement | null) => void;
}) {
  const mastered = s.level >= 4;
  // o ref fica no bloco inteiro (nó + nome) para as linhas não cortarem o texto
  return (
    <div
      ref={nodeRef}
      className="relative flex w-[84px] flex-col items-center sm:w-[104px]"
    >
      <motion.button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        aria-label={`${s.name}, nível ${s.level} de ${MAX_LEVEL}`}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className={`relative flex h-16 w-16 flex-col items-center justify-center rounded-xl border-2 transition-colors sm:h-[76px] sm:w-[76px] ${
          mastered
            ? "border-accent bg-accent text-accent-ink"
            : "border-accent/60 bg-panel-solid text-ink"
        }`}
      >
        {!mastered && (
          <span
            className="absolute inset-0 bg-accent"
            style={{ opacity: s.level * 0.05 }}
          />
        )}
        <span
          className={`relative font-extrabold leading-none ${s.code.length >= 4 ? "text-[15px] sm:text-base" : "text-lg sm:text-xl"}`}
        >
          {s.code}
        </span>
        <span className="relative mt-1.5 font-mono text-xs font-bold leading-none">
          {String(s.level).padStart(2, "0")}/
          {String(MAX_LEVEL).padStart(2, "0")}
        </span>
      </motion.button>
      <span
        className={`mt-2 text-center text-[14px] font-bold leading-tight ${selected ? "text-accent" : "text-ink"}`}
      >
        {s.name}
      </span>
    </div>
  );
}

function Tree({
  branch,
  selected,
  onSelect,
}: {
  branch: Branch;
  selected?: string;
  onSelect: (id: string) => void;
}) {
  const rows = useMemo(() => rowsOf(branch.skills), [branch]);
  const wrap = useRef<HTMLDivElement>(null);
  const nodes = useRef(new Map<string, HTMLDivElement>());
  const [lines, setLines] = useState<{ id: string; d: string }[]>([]);

  const measure = useCallback(() => {
    const root = wrap.current;
    if (!root) return;
    // offsetTop/offsetLeft ignoram transforms, por isso as linhas não
    // ficam tortas enquanto os nós ainda estão a animar.
    const box = (el?: HTMLElement) => {
      if (!el) return undefined;
      let x = 0;
      let y = 0;
      for (
        let n: HTMLElement | null = el;
        n && n !== root;
        n = n.offsetParent as HTMLElement | null
      ) {
        x += n.offsetLeft;
        y += n.offsetTop;
      }
      return {
        cx: x + el.offsetWidth / 2,
        top: y,
        bottom: y + el.offsetHeight,
      };
    };
    const next: { id: string; d: string }[] = [];
    for (const s of branch.skills) {
      if (!s.parent) continue;
      const a = box(nodes.current.get(s.parent));
      const b = box(nodes.current.get(s.id));
      if (!a || !b) continue;
      const mid = a.bottom + (b.top - a.bottom) / 2;
      next.push({
        id: s.id,
        d: `M ${a.cx} ${a.bottom} V ${mid} H ${b.cx} V ${b.top}`,
      });
    }
    setLines(next);
  }, [branch]);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrap.current) ro.observe(wrap.current);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  return (
    <div ref={wrap} className="relative py-2">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        {lines.map((l, i) => (
          <motion.path
            key={`${branch.id}-${l.id}`}
            d={l.d}
            fill="none"
            stroke="#22d3ee"
            strokeOpacity="0.75"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
          />
        ))}
      </svg>
      <div className="relative flex flex-col gap-9 sm:gap-11">
        {rows.map((row, depth) => (
          <div key={depth} className="flex justify-center gap-3 sm:gap-10">
            {row.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: depth * 0.12 + i * 0.04 }}
              >
                <SkillNode
                  s={s}
                  selected={s.id === selected}
                  onSelect={() => onSelect(s.id)}
                  nodeRef={(el) => {
                    if (el) nodes.current.set(s.id, el);
                    else nodes.current.delete(s.id);
                  }}
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillDetail({ branch, skill }: { branch: Branch; skill: Skill }) {
  const used = projects.filter((p) => skill.projects?.includes(p.id));
  return (
    <div>
      <p className="label text-accent">{branch.name}</p>
      <h2 className="mt-1 text-3xl font-extrabold uppercase">{skill.name}</h2>
      <p className="mt-4 text-[17px] text-muted">{skill.desc}</p>

      {used.length > 0 && (
        <div className="mt-5">
          <PanelTitle>Usada em</PanelTitle>
          <ul className="flex flex-col gap-1.5">
            {used.map((p) => (
              <li key={p.id}>
                <a
                  href={href("inventario", p.id)}
                  className="flex items-center justify-between rounded-lg border border-line bg-white/[0.04] px-3 py-2.5 text-base font-semibold transition-colors hover:border-accent"
                >
                  {p.name}
                  <span className="label">{p.type}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function Skills() {
  const desktop = useIsDesktop();
  const [branchId, setBranchId] = useState(branches[0].id);
  const branch = branches.find((b) => b.id === branchId)!;
  const [selected, setSelected] = useState<string>(branch.skills[0].id);
  const [sheet, setSheet] = useState(false);
  const chips = useRef<HTMLDivElement>(null);

  const pickBranch = useCallback((id: string) => {
    setBranchId(id);
    setSelected(branches.find((b) => b.id === id)!.skills[0].id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e) || (e.key !== "ArrowLeft" && e.key !== "ArrowRight"))
        return;
      const i = branches.findIndex((b) => b.id === branchId);
      const n =
        (i + (e.key === "ArrowRight" ? 1 : -1) + branches.length) %
        branches.length;
      pickBranch(branches[n].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [branchId, pickBranch]);

  // mantém o separador activo visível na faixa de chips do celular
  useEffect(() => {
    chips.current
      ?.querySelector<HTMLElement>(`[data-id="${branchId}"]`)
      ?.scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: "smooth",
      });
  }, [branchId]);

  const skill =
    branch.skills.find((s) => s.id === selected) ?? branch.skills[0];

  const onSelect = (id: string) => {
    setSelected(id);
    if (!desktop) setSheet(true);
  };

  return (
    <div>
      <SectionTitle kicker="Árvore de habilidades" title="Habilidades" />

      {/* Celular: hub compacto + separadores deslizáveis */}
      <div className="lg:hidden">
        <div className="flex items-center gap-4">
          <div className="min-w-0">
            <p className="text-2xl font-bold uppercase leading-tight">
              {branch.name}
            </p>
            <p className="text-sm text-muted">{branch.desc}</p>
          </div>
        </div>
        <div
          ref={chips}
          data-noswipe
          className="no-scrollbar -mx-4 mt-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1"
        >
          {branches.map((b) => (
            <button
              key={b.id}
              data-id={b.id}
              type="button"
              onClick={() => pickBranch(b.id)}
              aria-pressed={b.id === branchId}
              className={`shrink-0 snap-center rounded-lg border px-3.5 py-2 text-[15px] font-bold ${
                b.id === branchId
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-line bg-white/[0.04] text-muted"
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:mt-0 lg:grid-cols-[260px_1fr_320px]">
        {/* Desktop: hub + lista de ramos */}
        <aside className="hidden flex-col gap-3 lg:flex">
          <div className="mt-2 flex flex-col gap-2">
            {branches.map((b) => (
              <BranchButton
                key={b.id}
                b={b}
                active={b.id === branchId}
                onClick={() => pickBranch(b.id)}
              />
            ))}
          </div>
        </aside>

        <section
          className="panel relative min-h-[420px] overflow-hidden px-2 py-6 sm:px-6"
          aria-label={`Ramo ${branch.name}`}
        >
          <div className="mb-6 hidden items-baseline justify-between px-2 lg:flex">
            <div>
              <p className="text-2xl font-bold uppercase">{branch.name}</p>
            </div>
            <p className="text-sm text-muted">{branch.desc}</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={branch.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Tree
                branch={branch}
                selected={desktop || sheet ? skill.id : undefined}
                onSelect={onSelect}
              />
            </motion.div>
          </AnimatePresence>
          <p className="mt-8 text-center text-[15px] text-muted lg:hidden">
            Toca numa habilidade para ver os detalhes
          </p>
        </section>

        <aside className="panel h-fit hidden p-5 lg:block" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
            >
              <SkillDetail branch={branch} skill={skill} />
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>

      <BottomSheet
        open={sheet && !desktop}
        onClose={() => setSheet(false)}
        label={skill.name}
      >
        <SkillDetail branch={branch} skill={skill} />
      </BottomSheet>
    </div>
  );
}
