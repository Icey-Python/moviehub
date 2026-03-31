"use client";

import Link from "next/link";

export default function Player({ movieId, movieTitle, type }: { movieId: number; movieTitle: string; type: "movie" | "tv" | "anime" }) {
  const embedUrl = type === "anime"
    ? `https://vidsrc.me/embed/anime/${movieId}`
    : `https://vidsrc.me/embed/${type}/${movieId}`;

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      {/* Top bar */}
      <div className="flex items-center justify-between h-12 px-4 bg-zinc-950 border-b border-zinc-800 shrink-0">
        <Link
          href={type === "anime" ? `/anime/${movieId}` : type === "tv" ? `/series/${movieId}` : `/movie/${movieId}`}
          className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <span className="text-xs text-zinc-400 hidden sm:inline truncate max-w-[200px]">{movieTitle}</span>
        <div className="w-16" />
      </div>

      {/* Player area */}
      <iframe src={embedUrl} className="flex-1 w-full h-full" />
    </div>
  );
}
