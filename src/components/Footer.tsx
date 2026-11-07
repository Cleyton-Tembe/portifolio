import { profile } from "../data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          Built with React and Tailwind CSS.{" "}
          <a
            href={profile.github}
            className="font-semibold text-ink underline-offset-4 hover:underline"
          >
            See the code on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
