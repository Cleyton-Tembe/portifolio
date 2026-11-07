import {
  siClerk,
  siCloudinary,
  siCss,
  siExpress,
  siGit,
  siHtml5,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siRedis,
  siSocketdotio,
  siSpringboot,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVite,
  type SimpleIcon,
} from "simple-icons";

const icons: Record<string, SimpleIcon> = {
  HTML5: siHtml5,
  CSS: siCss,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  React: siReact,
  "Next.js": siNextdotjs,
  Vite: siVite,
  "Tailwind CSS": siTailwindcss,
  "Node.js": siNodedotjs,
  Express: siExpress,
  "Socket.io": siSocketdotio,
  "Spring Boot": siSpringboot,
  PostgreSQL: siPostgresql,
  MongoDB: siMongodb,
  Prisma: siPrisma,
  Supabase: siSupabase,
  Clerk: siClerk,
  Cloudinary: siCloudinary,
  Stripe: siStripe,
  Redis: siRedis,
  Git: siGit,
};

function isDark(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 60;
}

type Props = { name: string; size?: "sm" | "md" };

export default function TechIcon({ name, size = "md" }: Props) {
  const icon = icons[name];
  const box = size === "sm" ? "size-10 rounded-xl" : "size-14 rounded-2xl";
  const svg = size === "sm" ? "size-5" : "size-7";

  return (
    <span
      role="img"
      aria-label={name}
      tabIndex={0}
      className={`group relative grid ${box} place-items-center border border-line bg-surface outline-offset-2`}
    >
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={svg}
          fill={isDark(icon.hex) ? "currentColor" : `#${icon.hex}`}
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <span aria-hidden="true" className="font-mono text-xs font-bold">
          {name.slice(0, 2)}
        </span>
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 translate-y-1 rounded-lg bg-night px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-white opacity-0 transition duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100"
      >
        {name}
      </span>
    </span>
  );
}
