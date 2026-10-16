import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { screens, navigate, useRoute, type ScreenId } from "./routes";
import { isTyping } from "./hooks";
import { Background } from "./components/Background";
import { BottomNav, HintBar, TopNav } from "./components/Nav";
import { Boot } from "./screens/Boot";
import { Home } from "./screens/Home";
import { Character } from "./screens/Character";
import { Skills } from "./screens/Skills";
import { Inventory } from "./screens/Inventory";

const BOOT_KEY = "ct-game-booted";

function readBooted() {
  try {
    return sessionStorage.getItem(BOOT_KEY) === "1";
  } catch {
    return false;
  }
}

export default function App() {
  const { screen, param } = useRoute();
  const [booted, setBooted] = useState(readBooted);

  const finishBoot = useCallback(() => {
    setBooted(true);
    try {
      sessionStorage.setItem(BOOT_KEY, "1");
    } catch {
      /* sem storage: mostra o arranque outra vez na próxima visita */
    }
  }, []);

  const step = useCallback(
    (dir: -1 | 1) => {
      const i = screens.findIndex((s) => s.id === screen);
      navigate(screens[(i + dir + screens.length) % screens.length].id);
    },
    [screen],
  );

  // Atalhos de consola: Q/E (LB/RB), 1–4 e Esc.
  useEffect(() => {
    if (!booted) return;
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (document.body.style.overflow === "hidden") return; // painel aberto
      const k = e.key.toLowerCase();
      if (k === "q") step(-1);
      else if (k === "e") step(1);
      else if (k === "escape" && screen !== "inicio") navigate("inicio");
      else if (/^[1-4]$/.test(k)) navigate(screens[Number(k) - 1].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [booted, screen, step]);

  // Deslizar no celular troca de separador.
  const touch = useRef<{ x: number; y: number; ok: boolean } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    const ok = !(e.target as HTMLElement).closest("[data-noswipe], [role=dialog]");
    touch.current = { x: t.clientX, y: t.clientY, ok };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start?.ok) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.8) step(dx < 0 ? 1 : -1);
  };

  const prevScreen = useRef<ScreenId>(screen);
  useEffect(() => {
    if (prevScreen.current !== screen) window.scrollTo({ top: 0 });
    prevScreen.current = screen;
  }, [screen]);

  return (
    <div className="relative isolate min-h-dvh">
      <Background screen={screen} />
      <AnimatePresence>{!booted && <Boot onDone={finishBoot} />}</AnimatePresence>

      <TopNav current={screen} onStep={step} />

      <main
        className="mx-auto max-w-7xl px-4 pb-28 pt-6 lg:px-8 lg:pb-6 lg:pt-8"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.25 }}
          >
            {screen === "inicio" && <Home />}
            {screen === "personagem" && <Character focus={param} />}
            {screen === "habilidades" && <Skills />}
            {screen === "inventario" && <Inventory focus={param} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <HintBar current={screen} />
      <BottomNav current={screen} />
    </div>
  );
}
