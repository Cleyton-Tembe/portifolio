import TechIcon from "./TechIcon";

export default function ProjectStack({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Built with">
      {stack.map((s) => (
        <li key={s}>
          <TechIcon name={s} size="sm" />
        </li>
      ))}
    </ul>
  );
}
