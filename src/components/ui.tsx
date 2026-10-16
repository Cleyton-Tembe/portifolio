import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "./Icon";

/** Cabeçalho de secção: etiqueta + título grande + linha. */
export function SectionTitle({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-4">
      <div className="min-w-0">
        <p className="label !text-accent">{kicker}</p>
        <h1 className="mt-1 text-4xl font-extrabold uppercase leading-none tracking-[0.04em] sm:text-5xl">
          {title}
        </h1>
      </div>
    </div>
  );
}

export function PanelTitle({
  children,
  right,
}: {
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-2.5 text-[15px] font-bold uppercase tracking-[0.1em] text-ink">
        <span className="h-4 w-1 rounded-full bg-accent" />
        {children}
      </h2>
      {right}
    </div>
  );
}

/** Indicador de nível em segmentos (■■■□□). */
export function Pips({
  value,
  max,
  size = "sm",
  color = "var(--color-accent)",
}: {
  value: number;
  max: number;
  size?: "sm" | "lg";
  color?: string;
}) {
  return (
    <span
      className="flex gap-[3px]"
      role="img"
      aria-label={`Nível ${value} de ${max}`}
    >
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`rounded-sm ${size === "lg" ? "h-2.5 w-7" : "h-1.5 w-3"}`}
          style={{ background: i < value ? color : "rgb(255 255 255 / 0.16)" }}
        />
      ))}
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-white/[0.06] px-2.5 py-1 text-sm font-semibold text-ink">
      {children}
    </span>
  );
}

/** Painel que sobe de baixo no celular (detalhes de item/skill). */
export function BottomSheet({
  open,
  onClose,
  label,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // portal: os ecrãs animam com transform/filter, o que prenderia o `fixed`
  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <motion.button
            type="button"
            aria-label="Fechar"
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-2xl border-t-2 border-accent bg-panel-solid px-5 pb-8 pt-3"
            style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) =>
              (info.offset.y > 120 || info.velocity.y > 600) && onClose()
            }
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="mx-auto h-1 w-12 rounded-full bg-white/25" />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 p-2 text-muted hover:text-ink"
              aria-label="Fechar"
            >
              <Icon name="close" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
