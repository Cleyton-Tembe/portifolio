import { Mail } from "lucide-react";
import { profile } from "../data/site";
import { GitHubIcon, LinkedInIcon } from "./icons";

export default function Contact() {
  const gmailLink = (to: string) =>
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}`;
  const button =
    "inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-semibold transition-transform hover:-translate-y-0.5";

  return (
    <section id="contact" className="h-screen flex justify-center items-center">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-4xl bg-night px-6 dark:ring-1 dark:ring-white/10 dark:bg-night-2/60 py-16 text-center text-white sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-24 size-72 rounded-full bg-glow-violet/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-20 -bottom-28 size-80 rounded-full bg-glow-pink/30 blur-3xl"
        />

        <div>
          <p className="font-mono text-sm text-glow-pink" aria-hidden="true">
            // contact
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Have a role or a project in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/75">
            I'm open to junior and internship roles and to freelance work. Tell
            me what you're building and I'll reply within a couple of days.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {profile.email && (
              <a
                target="_blank"
                rel="noreferrer"
                href={gmailLink(profile.email)}
                className={`${button} bg-glow-pink text-night`}
              >
                <Mail className="size-4" aria-hidden="true" />
                Email me
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                className={`${button} border border-white/25 text-white hover:bg-white/10`}
              >
                <LinkedInIcon className="size-4" />
                LinkedIn
              </a>
            )}
            <a
              href={profile.github}
              className={`${button} ${
                profile.email
                  ? "border border-white/25 text-white hover:bg-white/10"
                  : "bg-glow-pink text-night"
              }`}
            >
              <GitHubIcon className="size-4" />
              Follow me on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
