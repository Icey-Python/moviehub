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
      className="relative w-full aspect-[16/9] md:aspect-video max-h-[300px] md:max-h-[480px] lg:max-h-[600px] overflow-hidden rounded-xl md:rounded-2xl border border-glass-border"
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

      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 sm:p-10 lg:p-16" key={movie.id}>
        {logo ? (
          <div className="mb-2 md:mb-4">
            <img
              src={logo}
              alt={movie.title}
              className="w-24 sm:w-36 md:w-44 lg:w-56 xl:w-64 h-auto drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
            />
          </div>
        ) : (
          <>
            <span className="text-[10px] sm:text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-2 md:mb-3">
              Featured
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl leading-tight line-clamp-2 md:line-clamp-none">
              {movie.title}
            </h1>
          </>
        )}

        <p className="mt-2 md:mt-4 text-xs sm:text-sm text-zinc-400 max-w-xs sm:max-w-xl md:max-w-2xl line-clamp-2 md:line-clamp-3 leading-relaxed">
          {movie.overview}
        </p>

        <div className="mt-3 md:mt-5 flex items-center gap-2 md:gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1">
            <IconStar className="w-3.5 h-3.5 md:w-4 h-4 text-amber-400" fill="currentColor" stroke={1.5} />
            <span className="font-semibold">{movie.vote_average?.toFixed(1) ?? "N/A"}</span>
            <span className="text-muted-foreground hidden sm:inline">/ 10</span>
          </div>
          <span className="text-muted-foreground hidden sm:inline">|</span>
          <span className="text-zinc-400">
            {movie.release_date?.slice(0, 4) ?? "—"}
          </span>
        </div>

        <div className="mt-4 md:mt-6 flex gap-2 md:gap-4">
          <Link
            href={`/movie/${movie.id}/watch`}
            className="inline-flex items-center gap-2 h-9 sm:h-10 md:h-12 px-4 sm:px-6 md:px-7 rounded-lg sm:rounded-xl bg-accent text-white font-medium text-xs sm:text-sm hover:bg-accent-hover transition-colors"
          >
            <IconPlayerPlay className="w-4 h-4 sm:w-5 h-5" fill="currentColor" stroke={1.5} />
            <span className="hidden sm:inline">Watch Now</span>
            <span className="sm:hidden">Play</span>
          </Link>
          <Link
            href={`/movie/${movie.id}`}
            className="inline-flex items-center gap-2 h-9 sm:h-10 md:h-12 px-4 sm:px-6 md:px-7 rounded-lg sm:rounded-xl glass text-xs sm:text-sm font-medium hover:bg-white/[0.08] transition-colors"
          >
            <IconInfoCircle className="w-4 h-4 sm:w-5 h-5" stroke={1.5} />
            <span className="hidden sm:inline">Details</span>
          </Link>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full glass bg-black/40 text-white hover:bg-black/60 transition-colors z-10 hidden sm:flex"
      >
        <IconChevronLeft className="w-4 h-4 sm:w-5 h-5" stroke={2} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full glass bg-black/40 text-white hover:bg-black/60 transition-colors z-10 hidden sm:flex"
      >
        <IconChevronRight className="w-4 h-4 sm:w-5 h-5" stroke={2} />
      </button>

      <div className="absolute bottom-3 sm:bottom-4 right-4 sm:right-8 md:right-12 lg:right-16 flex items-center gap-1.5 sm:gap-2 z-10">
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === current ? "w-4 sm:w-6 bg-accent" : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
