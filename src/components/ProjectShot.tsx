import { ImageIcon } from "lucide-react";

type Props = { src: string; title: string; eager?: boolean };

export default function ProjectShot({ src, title, eager = false }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_50px_-28px_rgba(20,26,51,0.55)]">
      <div
        className="flex gap-1.5 border-b border-line px-3 py-2.5"
        aria-hidden="true"
      >
        <span className="size-2.5 rounded-full bg-[#ff6b6b]" />
        <span className="size-2.5 rounded-full bg-[#ffc845]" />
        <span className="size-2.5 rounded-full bg-[#40c08a]" />
      </div>
      {src ? (
        <img
          src={src}
          alt={`Home page of ${title}`}
          width={1280}
          height={800}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="block aspect-16/10 w-full object-cover object-top"
        />
      ) : (
        <div
          aria-hidden="true"
          className="grid aspect-16/10 w-full place-items-center bg-linear-to-br from-pill to-paper text-ink-soft"
        >
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="size-8" />
            <span className="font-display text-lg font-bold text-ink">
              {title}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
