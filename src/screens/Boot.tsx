import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { profile } from "../data/profile";

// Ecrã de arranque: barra de carregamento e depois o botão "Começar".
// O portfólio só abre quando a pessoa carrega no botão (ou numa tecla).

const steps = ["A carregar perfil", "A preparar árvore de habilidades", "A abrir inventário"];

export function Boot({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const ready = progress >= 100;

  useEffect(() => {
    if (ready) return;
    const id = window.setTimeout(() => setProgress((p) => Math.min(100, p + 4 + Math.random() * 9)), 70);
    return () => window.clearTimeout(id);
  }, [progress, ready]);

  useEffect(() => {
    if (!ready) return;
    const go = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.key === "Tab") return;
      onDone();
    };
    window.addEventListener("keydown", go);
    return () => window.removeEventListener("keydown", go);
  }, [ready, onDone]);

  const step = steps[Math.min(steps.length - 1, Math.floor((progress / 100) * steps.length))];

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-bg px-6 text-center"
      style={{ background: "radial-gradient(70% 55% at 50% 45%, #10202a 0%, #0a0d12 70%)" }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5 }}
    >
      <motion.svg
        width="76"
        height="76"
        viewBox="0 0 32 32"
        aria-hidden="true"
        initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <path d="M16 2l12.5 7.2v14.6L16 31 3.5 23.8V9.2z" fill="rgb(34 211 238 / 0.12)" stroke="#22d3ee" strokeWidth="1.5" />
        <text x="16" y="20" textAnchor="middle" fill="#f1f4f8" style={{ font: '800 10px "Exo 2", sans-serif' }}>
          {profile.initials}
        </text>
      </motion.svg>

      <motion.h1
        className="mt-6 text-[clamp(2.6rem,10vw,6.5rem)] font-extrabold uppercase leading-[0.95] tracking-[0.04em]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        {profile.callsign}
      </motion.h1>
      <motion.p
        className="mt-3 text-lg font-semibold uppercase tracking-[0.2em] text-accent sm:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {profile.role}
      </motion.p>

      <div className="mt-14 h-28 w-full max-w-sm">
        {!ready ? (
          <div>
            <div className="flex justify-between text-sm font-semibold text-muted">
              <span>{step}…</span>
              <span className="font-mono text-ink">{Math.floor(progress)}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-accent shadow-[0_0_12px_rgb(34_211_238/0.8)] transition-[width] duration-100" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
            <button
              type="button"
              onClick={onDone}
              autoFocus
              className="glow cut flex items-center gap-3 bg-accent px-10 py-4 text-xl font-extrabold uppercase tracking-[0.12em] text-accent-ink transition-transform hover:scale-105 active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 4l14 8-14 8z" fill="currentColor" />
              </svg>
              Começar
            </button>
            <p className="mt-4 text-[15px] font-medium text-muted">
              <span className="hidden sm:inline">ou pressiona qualquer tecla</span>
              <span className="sm:hidden">Toca no botão para entrar</span>
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
