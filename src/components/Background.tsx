import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { ScreenId } from "../routes";

// Fundo de "lobby" de jogo: brilhos de cor, grelha hexagonal e partículas.
// Fica propositadamente discreto para o texto ser sempre o mais visível.

const glowPos: Record<ScreenId, { a: [string, string]; b: [string, string] }> = {
  inicio: { a: ["78%", "18%"], b: ["8%", "90%"] },
  personagem: { a: ["14%", "20%"], b: ["92%", "85%"] },
  habilidades: { a: ["50%", "10%"], b: ["85%", "95%"] },
  inventario: { a: ["88%", "40%"], b: ["10%", "15%"] },
};

const hex =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='97' viewBox='0 0 56 97'%3E%3Cpath d='M28 0 56 16v32L28 64 0 48V16zM28 64v33M0 16-28 0M56 16 84 0' fill='none' stroke='%23ffffff' stroke-opacity='0.05'/%3E%3C/svg%3E\")";

function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const parts = Array.from({ length: w < 640 ? 28 : 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.5,
      v: Math.random() * 0.3 + 0.06,
      a: Math.random() * 0.45 + 0.15,
      cyan: Math.random() < 0.6,
      phase: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        if (!reduce) {
          p.y -= p.v;
          p.x += Math.sin(t / 2000 + p.phase) * 0.15;
          if (p.y < -10) {
            p.y = h + 10;
            p.x = Math.random() * w;
          }
        }
        const alpha = p.a * (0.7 + 0.3 * Math.sin(t / 600 + p.phase));
        ctx.fillStyle = p.cyan ? `rgba(34,211,238,${alpha})` : `rgba(181,123,255,${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

export function Background({ screen }: { screen: ScreenId }) {
  const g = glowPos[screen];
  const orb = "absolute h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl";
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0d121a 0%, #0a0d12 55%, #07090d 100%)" }} />
      <motion.div
        className={orb}
        style={{ background: "radial-gradient(circle, rgb(34 211 238 / 0.16), transparent 65%)" }}
        animate={{ left: g.a[0], top: g.a[1] }}
        initial={false}
        transition={{ duration: 1.6, ease: [0.3, 0.6, 0.2, 1] }}
      />
      <motion.div
        className={orb}
        style={{ background: "radial-gradient(circle, rgb(139 92 246 / 0.14), transparent 65%)" }}
        animate={{ left: g.b[0], top: g.b[1] }}
        initial={false}
        transition={{ duration: 1.6, ease: [0.3, 0.6, 0.2, 1] }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: hex,
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />
      <Particles />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgb(0 0 0 / 0.55) 100%)" }} />
    </div>
  );
}
