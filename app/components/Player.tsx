"use client";

import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

export default function Player({ movieId, movieTitle, type }: { movieId: number; movieTitle: string; type: "movie" | "tv" | "anime" }) {
  const embedUrl = type === "anime"
    ? `https://vidsrc.me/embed/anime/${movieId}`
    : `https://vidsrc.me/embed/${type}/${movieId}`;

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      <div className="flex items-center justify-between h-14 px-6 bg-black/80 backdrop-blur-xl border-b border-glass-border shrink-0">
        <Link
          href={type === "anime" ? `/anime/${movieId}` : type === "tv" ? `/series/${movieId}` : `/movie/${movieId}`}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <IconArrowLeft className="w-4 h-4" stroke={2} />
          Back
        </Link>
        <span className="text-xs text-zinc-500 hidden sm:inline truncate max-w-[240px]">{movieTitle}</span>
        <div className="w-16" />
      </div>

      <iframe src={embedUrl} className="flex-1 w-full h-full" />
    </div>
  );
}
