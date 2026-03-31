"use client";

import { useState } from "react";
import Link from "next/link";

interface AnimePlayerProps {
  animeId: number;
  animeTitle: string;
  episodes: number;
  episode: number;
  anilistId?: number;
}

const EMBED_PROVIDERS = [
  { 
    name: "VidNest (Sub)", 
    getUrl: (title: string, ep: number, anilistId: number) => {
      return `https://vidnest.fun/anime/${anilistId}/${ep}/sub`;
    }
  },
  { 
    name: "VidNest (Dub)", 
    getUrl: (title: string, ep: number, anilistId: number) => {
      return `https://vidnest.fun/anime/${anilistId}/${ep}/dub`;
    }
  },
  { 
    name: "VidNest (Hindi)", 
    getUrl: (title: string, ep: number, anilistId: number) => {
      return `https://vidnest.fun/anime/${anilistId}/${ep}/hindi`;
    }
  },
];

export default function AnimePlayer({ animeId, animeTitle, episodes, episode, anilistId }: AnimePlayerProps) {
  const [providerIndex, setProviderIndex] = useState(0);

  const currentProvider = EMBED_PROVIDERS[providerIndex];
  const embedUrl = currentProvider.getUrl(animeTitle, episode, anilistId ?? 0);

  const handleProviderChange = () => {
    setProviderIndex((prev) => (prev + 1) % EMBED_PROVIDERS.length);
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      <div className="flex items-center justify-between h-12 px-4 bg-zinc-950 border-b border-zinc-800 shrink-0">
        <Link
          href={`/anime/${animeId}`}
          className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <span className="text-xs text-zinc-400 hidden sm:inline truncate max-w-[200px]">
          {animeTitle} - Ep {episode}
        </span>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <a
              href={`/anime/${animeId}/watch?ep=${Math.max(1, episode - 1)}`}
              className={`px-2 py-1 text-xs font-medium bg-zinc-900 text-zinc-300 rounded-md hover:text-white transition-colors border border-zinc-700 ${episode <= 1 ? "opacity-40 cursor-not-allowed pointer-events-none" : ""}`}
            >
              -
            </a>
            <span className="text-xs text-zinc-400 w-12 text-center">Ep {episode}</span>
            <a
              href={`/anime/${animeId}/watch?ep=${Math.min(episodes, episode + 1)}`}
              className={`px-2 py-1 text-xs font-medium bg-zinc-900 text-zinc-300 rounded-md hover:text-white transition-colors border border-zinc-700 ${episode >= episodes ? "opacity-40 cursor-not-allowed pointer-events-none" : ""}`}
            >
              +
            </a>
          </div>
          <button
            onClick={handleProviderChange}
            className="px-2 py-1 text-xs font-medium bg-zinc-900 text-zinc-300 rounded-md hover:text-white transition-colors border border-zinc-700"
          >
            {currentProvider.name}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 relative">

        <iframe
          src={embedUrl}
          className="w-full h-full"
          allowFullScreen
        />
      </div>
    </div>
  );
}
