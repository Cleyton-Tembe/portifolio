import { useCallback, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.dataset.theme as Theme) ?? "light",
  );

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        // private mode: the choice just won't be remembered
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
