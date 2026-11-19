import { Fragment, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { profile } from "../data/site";

const keys = [
  {
    glyph: "{ }",
    x: "8%",
    y: "22%",
    size: 92,
    rotate: -14,
    depth: 26,
    delay: 0.1,
  },
  {
    glyph: "</>",
    x: "80%",
    y: "16%",
    size: 112,
    rotate: 12,
    depth: 40,
    delay: 0.25,
  },
  {
    glyph: "=>",
    x: "14%",
    y: "68%",
    size: 78,
    rotate: 18,
    depth: 18,
    delay: 0.4,
  },
  {
    glyph: "( )",
    x: "84%",
    y: "64%",
    size: 84,
    rotate: -10,
    depth: 30,
    delay: 0.55,
  },
  {
    glyph: ";",
    x: "66%",
    y: "80%",
    size: 58,
    rotate: 22,
    depth: 12,
    delay: 0.7,
  },
  {
    glyph: "[ ]",
    x: "28%",
    y: "10%",
    size: 60,
    rotate: 8,
    depth: 14,
    delay: 0.85,
  },
];

function Keycap({
  k,
  px,
  py,
}: {
  k: (typeof keys)[number];
  px: MotionValue<number>;
  py: MotionValue<number>;
}) {
  const x = useTransform(px, (v) => v * k.depth);
  const y = useTransform(py, (v) => v * k.depth);

  return (
    <motion.div
      className="absolute"
      style={{ left: k.x, top: k.y, x, y }}
      initial={{ opacity: 0, scale: 0.6, rotate: k.rotate - 30 }}
      animate={{ opacity: 1, scale: 1, rotate: k.rotate }}
      transition={{
        delay: k.delay,
        type: "spring",
        stiffness: 120,
        damping: 14,
      }}
    >
      <div
        className="relative rounded-[22%] bg-[#c9d0ee] shadow-[0_20px_40px_-20px_rgba(23,28,52,0.25)] dark:bg-[#0d1129] dark:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
        style={{ width: k.size, height: k.size }}
      >
        <div
          className="absolute inset-x-[7%] top-[5%] bottom-[13%] grid place-items-center rounded-[20%] border border-ink/10 bg-linear-to-b from-white to-[#e6eaff] font-mono font-bold text-ink-soft dark:border-white/10 dark:from-[#36418a] dark:to-[#232c5c] dark:text-white/90"
          style={{ fontSize: k.size * 0.3 }}
        >
          {k.glyph}
        </div>
      </div>
    </motion.div>
  );
}

const nameWords = profile.name.toUpperCase().split(" ");

export default function Hero() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 60, damping: 20 });
  const py = useSpring(rawY, { stiffness: 60, damping: 20 });
  const orbX = useTransform(px, (v) => v * -20);
  const orbY = useTransform(py, (v) => v * -20);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [rawX, rawY]);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-paper px-4 pt-24 pb-40 text-center text-ink dark:bg-night dark:text-white"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] size-[60vmax] rounded-full bg-glow-violet/12 blur-[120px]" />
        <div className="absolute right-[-15%] bottom-[-20%] size-[55vmax] rounded-full bg-glow-pink/10 blur-[120px]" />
        <motion.div
          className="absolute top-[18%] right-[30%] hidden size-14 rounded-full sm:block bg-radial from-[#fff3c4] via-glow-amber to-glow-pink shadow-[0_0_24px_4px_rgba(255,179,71,0.15)]"
          style={{ x: orbX, y: orbY }}
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden sm:block"
      >
        {keys.map((k) => (
          <Keycap key={k.glyph} k={k} px={px} py={py} />
        ))}
      </div>

      {profile.avatar ? (
        <motion.img
          src={profile.avatar}
          alt={profile.name}
          width={128}
          height={128}
          className="size-28 rounded-full object-cover ring-4 ring-line sm:size-32 dark:ring-white/15"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
      ) : (
        <motion.div
          aria-hidden="true"
          className="grid size-28 place-items-center rounded-full bg-linear-to-br from-glow-violet to-glow-pink font-display text-4xl font-bold text-white ring-4 ring-line sm:size-32 dark:ring-white/15"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {profile.initials}
        </motion.div>
      )}

      <h1
        aria-label={profile.name}
        className="mt-8 font-display text-[clamp(3.25rem,11.5vw,9.5rem)] leading-[0.88] font-extrabold tracking-[-0.03em]"
      >
        {nameWords.map((word, w) => (
          <Fragment key={word}>
            {w > 0 && " "}
            <span aria-hidden="true" className="inline-block whitespace-nowrap">
              {word.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: "0.4em" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + (w * 7 + i) * 0.035,
                    type: "spring",
                    stiffness: 200,
                    damping: 18,
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          </Fragment>
        ))}
      </h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.6 }}
        className="max-w-xl"
      >
        <p className="mt-6 font-display text-xl text-ink sm:text-2xl dark:text-white">
          {profile.role}. {profile.tagline}
        </p>
        <p className="mt-4 text-ink-soft dark:text-white/70">{profile.intro}</p>
      </motion.div>
    </section>
  );
}
