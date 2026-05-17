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
      className="relative w-full h-[260px] sm:h-[320px] md:h-[420px] lg:h-[520px] overflow-hidden rounded-2xl border border-border/50"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Featured movies carousel"
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

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent md:via-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent md:from-black/50" />
      <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent opacity-50" />

      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-12" key={movie.id}>
        {logo ? (
          <div className="mb-2 sm:mb-3">
            <img
              src={logo}
              alt={movie.title}
              className="w-24 sm:w-32 md:w-40 lg:w-48 h-auto drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
            />
          </div>
        ) : (
          <>
            <span className="text-[10px] sm:text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-1.5">
              Featured
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight max-w-[240px] sm:max-w-sm md:max-w-lg leading-tight line-clamp-2">
              {movie.title}
            </h1>
          </>
        )}

        <p className="mt-2 text-[10px] sm:text-sm text-zinc-400 max-w-[200px] sm:max-w-sm md:max-w-lg line-clamp-2 leading-relaxed">
          {movie.overview}
        </p>

        <div className="mt-3 flex items-center gap-3 text-[10px] sm:text-sm">
          <div className="flex items-center gap-1.5">
            <IconStar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" fill="currentColor" stroke={1.5} />
            <span className="font-semibold">{movie.vote_average?.toFixed(1) ?? "N/A"}</span>
          </div>
          <span className="text-zinc-500 hidden sm:inline">|</span>
          <span className="text-zinc-400">
            {movie.release_date?.slice(0, 4) ?? "—"}
          </span>
        </div>

        <div className="mt-4 flex gap-3">
          <Link href={`/movie/${movie.id}/watch`}>
            <button className="btn-primary h-10 sm:h-11 px-4 sm:px-6 text-xs sm:text-sm rounded-xl">
              <IconPlayerPlay className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" stroke={1.5} />
              <span>Watch</span>
            </button>
          </Link>
          <Link href={`/movie/${movie.id}`}>
            <button className="btn-secondary h-10 sm:h-11 px-4 sm:px-6 text-xs sm:text-sm rounded-xl">
              <IconInfoCircle className="w-4 h-4 sm:w-5 sm:h-5" stroke={1.5} />
              <span>Info</span>
            </button>
          </Link>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass bg-black/40 text-white hover:bg-black/60 transition-colors z-10 hidden sm:flex items-center justify-center"
        aria-label="Previous movie"
      >
        <IconChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" stroke={2} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass bg-black/40 text-white hover:bg-black/60 transition-colors z-10 hidden sm:flex items-center justify-center"
        aria-label="Next movie"
      >
        <IconChevronRight className="w-5 h-5 sm:w-6 sm:h-6" stroke={2} />
      </button>

      <div className="absolute bottom-3 sm:bottom-4 right-4 sm:right-6 flex items-center gap-2 z-10">
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-accent" : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
