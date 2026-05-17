"use client";

import { useState } from "react";
import { IconBrandYoutube, IconX } from "@tabler/icons-react";

export default function TrailerButton({ videoKey, title }: { videoKey: string; title?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-secondary rounded-xl"
        aria-label="Watch trailer"
      >
        <IconBrandYoutube className="w-5 h-5 text-accent" stroke={1.5} />
        Watch Trailer
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Trailer player"
        >
          <div
            className="relative w-full max-w-5xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 w-10 h-10 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              aria-label="Close trailer"
            >
              <IconX className="w-6 h-6" stroke={2} />
            </button>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border/50">
              <iframe
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={title ? `${title} Trailer` : "Trailer"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
