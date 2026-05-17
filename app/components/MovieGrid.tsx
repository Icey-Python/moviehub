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
          <h2 className="section-heading">{title}</h2>
        )}
        <p className="text-muted-foreground text-center py-16">No results found.</p>
      </section>
    );
  }

  return (
    <section>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-heading">{title}</h2>
        <div className="flex items-center gap-1 xs:gap-1.5">
          <button
            onClick={() => scroll("left")}
            className="carousel-dot w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl glass flex items-center justify-center hover:bg-white/[0.08] transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Scroll left"
          >
            <IconChevronLeft className="w-4 h-4 xs:w-5 xs:h-5" stroke={2} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="carousel-dot w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl glass flex items-center justify-center hover:bg-white/[0.08] transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Scroll right"
          >
            <IconChevronRight className="w-4 h-4 xs:w-5 xs:h-5" stroke={2} />
          </button>
        </div>
        </div>
      )}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x"
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
