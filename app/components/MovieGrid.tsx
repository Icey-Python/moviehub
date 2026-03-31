"use client";

import { useRef } from "react";
import type { Movie, TVShow, AnilistAnime } from "@/app/lib/types";
import MovieCard from "./MovieCard";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type MediaItem = Movie | TVShow | AnilistAnime;

export default function MovieGrid({
  movies,
  title,
  isTV = false,
  isAnime = false,
}: {
  movies: MediaItem[];
  title?: string;
  isTV?: boolean;
  isAnime?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (movies.length === 0) {
    return (
      <section>
        {title && (
          <h2 className="text-xl font-bold mb-6 tracking-tight">{title}</h2>
        )}
        <p className="text-muted-foreground text-center py-16">No results found.</p>
      </section>
    );
  }

  return (
    <section>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-white/[0.08] transition-colors text-muted-foreground hover:text-foreground"
            >
              <IconChevronLeft className="w-5 h-5" stroke={2} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-white/[0.08] transition-colors text-muted-foreground hover:text-foreground"
            >
              <IconChevronRight className="w-5 h-5" stroke={2} />
            </button>
          </div>
        </div>
      )}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
      >
        {movies.map((movie) => (
          <MovieCard
            key={isAnime ? (movie as AnilistAnime).id : movie.id}
            movie={movie}
            isTV={isTV}
            isAnime={isAnime}
          />
        ))}
      </div>
    </section>
  );
}
