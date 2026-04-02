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
      className="relative w-full aspect-video max-h-[600px] overflow-hidden rounded-2xl border border-glass-border"
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
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16" key={movie.id}>
        {logo ? (
          <div className="mb-4">
            <img
              src={logo}
              alt={movie.title}
              className="w-40 sm:w-56 lg:w-72 h-auto drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
            />
          </div>
        ) : (
          <>
            <span className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-3">
              Featured
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl leading-tight">
              {movie.title}
            </h1>
          </>
        )}

        <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl line-clamp-3 leading-relaxed">
          {movie.overview}
        </p>

        <div className="mt-5 flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm">
            <IconStar className="w-4 h-4 text-amber-400" fill="currentColor" stroke={1.5} />
            <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
            <span className="text-muted-foreground">/ 10</span>
          </div>
          <span className="text-muted-foreground">|</span>
          <span className="text-sm text-zinc-400">
            {movie.release_date?.slice(0, 4)}
          </span>
        </div>

        <div className="mt-6 flex gap-4">
          <Link
            href={`/movie/${movie.id}/watch`}
            className="inline-flex items-center gap-2.5 h-12 px-7 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors"
          >
            <IconPlayerPlay className="w-5 h-5" fill="currentColor" stroke={1.5} />
            Watch Now
          </Link>
          <Link
            href={`/movie/${movie.id}`}
            className="inline-flex items-center gap-2 h-12 px-7 rounded-xl glass text-sm font-medium hover:bg-white/[0.08] transition-colors"
          >
            <IconInfoCircle className="w-5 h-5" stroke={1.5} />
            Details
          </Link>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full glass bg-black/40 text-white hover:bg-black/60 transition-colors z-10"
      >
        <IconChevronLeft className="w-5 h-5" stroke={2} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full glass bg-black/40 text-white hover:bg-black/60 transition-colors z-10"
      >
        <IconChevronRight className="w-5 h-5" stroke={2} />
      </button>

      <div className="absolute bottom-4 right-8 sm:right-12 lg:right-16 flex items-center gap-2 z-10">
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-accent" : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
