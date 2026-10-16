import { useEffect, useState } from "react";

// Navegação por hash (#/habilidades) — evita o 404 do GitHub Pages ao recarregar.
export const screens = [
  { id: "inicio", label: "Início", hint: "Menu principal" },
  { id: "personagem", label: "Personagem", hint: "CV e contacto" },
  { id: "habilidades", label: "Habilidades", hint: "Árvore de habilidades" },
  { id: "inventario", label: "Inventário", hint: "Projectos" },
] as const;

export type ScreenId = (typeof screens)[number]["id"];

export type Route = { screen: ScreenId; param?: string };

function parse(hash: string): Route {
  const [, screen, param] = hash.replace(/^#/, "").split("/");
  const found = screens.find((s) => s.id === screen);
  return found ? { screen: found.id, param: param ? decodeURIComponent(param) : undefined } : { screen: "inicio" };
}

export const href = (screen: ScreenId, param?: string) =>
  screen === "inicio" ? "#/" : `#/${screen}${param ? `/${encodeURIComponent(param)}` : ""}`;

/** `replace` troca a entrada do histórico (útil ao percorrer itens com as setas). */
export function navigate(screen: ScreenId, param?: string, replace = false) {
  if (!replace) {
    window.location.hash = href(screen, param);
    return;
  }
  window.history.replaceState(null, "", href(screen, param));
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parse(window.location.hash));
  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}
