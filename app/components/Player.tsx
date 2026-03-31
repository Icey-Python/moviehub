"use client";

import Link from "next/link";

export default function Player({ movieId, movieTitle }: { movieId: number; movieTitle: string }) {
  const embedUrl = `https://vidsrc.to/embed/movie/${movieId}`;

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      {/* Top bar */}
      <div className="flex items-center justify-between h-12 px-4 bg-zinc-950 border-b border-zinc-800 shrink-0">
        <Link
          href={`/movie/${movieId}`}
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
      <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 p-6">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-zinc-900 flex items-center justify-center">
            <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
          
          <h2 className="text-xl font-semibold text-white">Watch {movieTitle}</h2>
          <p className="text-sm text-zinc-400 max-w-md">
            Due to streaming site restrictions, the player opens in a new tab for the best experience.
          </p>
          
          <a
            href={embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full h-12 px-6 rounded-lg bg-accent text-accent-foreground font-medium text-sm hover:bg-emerald-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            Watch in New Tab
          </a>
          
          <p className="mt-4 text-xs text-zinc-500">
            If the video doesn't start automatically, click the play button on the streaming site.
          </p>
        </div>
      </div>
    </div>
  );
}
