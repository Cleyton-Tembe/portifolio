import { Mail } from "lucide-react";
import { profile } from "../data/site";
import { LinkedInIcon, WhatsAppIcon } from "./icons";

export default function Contact() {
  const gmailLink = (to: string) =>
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}`;
  const button =
    "inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-semibold transition-transform hover:-translate-y-0.5";

  return (
    <section id="contact" className="h-screen flex justify-center items-center">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-4xl bg-surface px-6 py-16 text-center text-ink ring-1 ring-line sm:px-12 dark:bg-night-2/60 dark:text-white dark:ring-white/10 sm:py-20">
        <div>
          <p
            className="font-mono text-sm text-pink dark:text-glow-pink"
            aria-hidden="true"
          >
            // contact
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Have a role or a project in mind? Contact me
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {profile.whatsapp && (
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`}
                className={`${button} bg-[#25D366] text-night`}
              >
                <WhatsAppIcon className="size-4" />
                WhatsApp
              </a>
            )}
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
                className={`${button} border border-ink/25 text-ink hover:bg-ink/5 dark:border-white/25 dark:text-white dark:hover:bg-white/10`}
              >
                <LinkedInIcon className="size-4" />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
