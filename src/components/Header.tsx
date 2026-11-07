import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { profile } from "../data/site";
import { GitHubIcon } from "./icons";

const links = [
  { href: "#work", label: "work" },
  { href: "#about", label: "about" },
  { href: "#contact", label: "contact" },
];

type Props = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onOpenResume: () => void;
};

export default function Header({ theme, onToggleTheme, onOpenResume }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const iconButton =
    "grid size-11 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white cursor-pointer";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-night/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="font-mono text-lg font-semibold text-[#7FE3F0]"
        >
          cleyton.tembe<span className="cursor-blink text-glow-pink">_</span>
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[0.95rem] leading-6 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <span className="text-glow-pink">//</span> {l.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-mono text-[0.95rem] leading-6 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <span className="text-glow-pink">//</span> resume
              </button>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={profile.github}
            aria-label="GitHub profile"
            className={iconButton}
          >
            <GitHubIcon className="size-5" />
          </a>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            className={iconButton}
          >
            {theme === "dark" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`${iconButton} md:hidden`}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-white/10 md:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 font-mono text-white/85 hover:bg-white/10"
                >
                  <span className="text-glow-pink">//</span> {l.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenResume();
                }}
                className="block w-full cursor-pointer rounded-lg px-3 py-3 text-left font-mono text-white/85 hover:bg-white/10"
              >
                <span className="text-glow-pink">//</span> resume
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
