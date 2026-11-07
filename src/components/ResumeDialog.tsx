import { useEffect, useRef } from "react";
import { Download, X } from "lucide-react";
import { profile } from "../data/site";

type Props = { open: boolean; onClose: () => void };

export default function ResumeDialog({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="resume-title"
      className="m-auto h-[min(92svh,1100px)] w-[min(94vw,820px)] max-w-none overflow-hidden rounded-2xl bg-surface p-0 text-ink backdrop:bg-night/80 backdrop:backdrop-blur-sm"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <h2 id="resume-title" className="font-display text-lg font-bold">
            Resume
          </h2>
          <div className="flex items-center gap-2">
            <a
              href={profile.resume.pdf}
              download
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-violet px-4 text-sm font-semibold text-on-violet"
            >
              <Download className="size-4" aria-hidden="true" />
              Download PDF
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume"
              className="grid size-11 cursor-pointer place-items-center rounded-full hover:bg-pill"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-pill p-3 sm:p-6">
          <img
            src={profile.resume.image}
            alt={`Resume of ${profile.name}: Computer Engineering student at Eduardo Mondlane University and full-stack web developer`}
            width={1241}
            height={1754}
            loading="lazy"
            className="mx-auto block h-auto w-full max-w-180 rounded-md bg-white shadow-lg"
          />
        </div>
      </div>
    </dialog>
  );
}
