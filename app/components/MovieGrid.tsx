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
        <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
          <h2 className="text-sm sm:text-base md:text-lg font-bold tracking-tight">{title}</h2>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={() => scroll("left")}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg glass flex items-center justify-center hover:bg-white/[0.08] transition-colors text-muted-foreground hover:text-foreground"
            >
              <IconChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" stroke={2} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg glass flex items-center justify-center hover:bg-white/[0.08] transition-colors text-muted-foreground hover:text-foreground"
            >
              <IconChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" stroke={2} />
            </button>
          </div>
        </div>
      )}
      <div
        ref={scrollRef}
        className="flex flex-wrap gap-3 sm:gap-4 md:gap-5 overflow-visible"
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
