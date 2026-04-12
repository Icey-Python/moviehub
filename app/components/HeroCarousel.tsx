"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/app/lib/types";
import { backdropUrl } from "@/app/lib/tmdb";
import { IconPlayerPlay, IconStar, IconInfoCircle, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export default function HeroCarousel({ movies, logos }: { movies: Movie[]; logos: (string | null)[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % movies.length);
  }, [movies.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + movies.length) % movies.length);
  }, [movies.length]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const movie = movies[current];
  const logo = logos[current];

  return (
    <section
      className="relative w-full h-[220px] sm:h-[280px] md:h-[360px] lg:h-[450px] overflow-hidden rounded-md sm:rounded-lg border border-glass-border"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {movies.map((m, i) => (
        <Image
          key={m.id}
          src={backdropUrl(m.backdrop_path)}
          alt={m.title}
          fill
          priority={i === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className={`object-cover transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent md:via-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent md:from-black/60" />

      <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-6" key={movie.id}>
        {logo ? (
          <div className="mb-1 sm:mb-2">
            <img
              src={logo}
              alt={movie.title}
              className="w-20 sm:w-28 md:w-36 h-auto drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]"
            />
          </div>
        ) : (
          <>
            <span className="text-[8px] sm:text-xs font-semibold text-accent uppercase tracking-[0.15em] mb-1">
              Featured
            </span>
            <h1 className="text-sm sm:text-lg md:text-2xl font-bold tracking-tight max-w-[200px] sm:max-w-xs md:max-w-lg leading-tight line-clamp-2">
              {movie.title}
            </h1>
          </>
        )}

        <p className="mt-1 text-[9px] sm:text-xs text-zinc-400 max-w-[180px] sm:max-w-xs line-clamp-2">
          {movie.overview}
        </p>

        <div className="mt-2 flex items-center gap-2 text-[9px] sm:text-xs">
          <div className="flex items-center gap-1">
            <IconStar className="w-3 h-3 text-amber-400" fill="currentColor" stroke={1.5} />
            <span className="font-semibold">{movie.vote_average?.toFixed(1) ?? "N/A"}</span>
          </div>
          <span className="text-muted-foreground hidden sm:inline">|</span>
          <span className="text-zinc-400">
            {movie.release_date?.slice(0, 4) ?? "—"}
          </span>
        </div>

        <div className="mt-3 flex gap-2">
          <Link
            href={`/movie/${movie.id}/watch`}
            className="flex items-center gap-1.5 h-8 sm:h-9 px-3 sm:px-4 rounded-md bg-accent text-white font-medium text-[10px] sm:text-xs hover:bg-accent-hover transition-colors"
          >
            <IconPlayerPlay className="w-3 h-3" fill="currentColor" stroke={1.5} />
            <span>Watch</span>
          </Link>
          <Link
            href={`/movie/${movie.id}`}
            className="flex items-center gap-1.5 h-8 sm:h-9 px-3 sm:px-4 rounded-md glass text-[10px] sm:text-xs font-medium hover:bg-white/[0.08] transition-colors"
          >
            <IconInfoCircle className="w-3 h-3" stroke={1.5} />
            <span>Info</span>
          </Link>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full glass bg-black/40 text-white hover:bg-black/60 transition-colors z-10 hidden sm:flex"
      >
        <IconChevronLeft className="w-4 h-4" stroke={2} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full glass bg-black/40 text-white hover:bg-black/60 transition-colors z-10 hidden sm:flex"
      >
        <IconChevronRight className="w-4 h-4" stroke={2} />
      </button>

      <div className="absolute bottom-2 right-3 flex items-center gap-1.5 z-10">
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === current ? "w-4 bg-accent" : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
