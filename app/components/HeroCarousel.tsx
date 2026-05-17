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
      className="relative w-full h-[200px] xs:h-[240px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl sm:rounded-2xl border border-border/50"
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

      <div className="absolute inset-0 flex flex-col justify-end p-3 xs:p-4 sm:p-6 md:p-8 lg:p-12" key={movie.id}>
        {logo ? (
          <div className="mb-1.5 xs:mb-2 sm:mb-3">
            <img
              src={logo}
              alt={movie.title}
              className="w-20 xs:w-24 sm:w-32 md:w-40 lg:w-48 h-auto drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
            />
          </div>
        ) : (
          <>
            <span className="text-[9px] xs:text-[10px] sm:text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-1 xs:mb-1.5">
              Featured
            </span>
            <h1 className="text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight max-w-[200px] xs:max-w-[240px] sm:max-w-sm md:max-w-lg leading-tight line-clamp-2">
              {movie.title}
            </h1>
          </>
        )}

        <p className="mt-1 xs:mt-1.5 sm:mt-2 text-[9px] xs:text-[10px] sm:text-sm text-zinc-400 max-w-[180px] xs:max-w-[200px] sm:max-w-sm md:max-w-lg line-clamp-2 leading-relaxed">
          {movie.overview}
        </p>

        <div className="mt-2 xs:mt-2.5 sm:mt-3 flex items-center gap-2 xs:gap-2.5 sm:gap-3 text-[9px] xs:text-[10px] sm:text-sm">
          <div className="flex items-center gap-1 xs:gap-1.5">
            <IconStar className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-amber-400" fill="currentColor" stroke={1.5} />
            <span className="font-semibold">{movie.vote_average?.toFixed(1) ?? "N/A"}</span>
          </div>
          <span className="text-zinc-500 hidden xs:inline">|</span>
          <span className="text-zinc-400">
            {movie.release_date?.slice(0, 4) ?? "—"}
          </span>
        </div>

        <div className="mt-3 xs:mt-3.5 sm:mt-4 flex gap-2 xs:gap-2.5 sm:gap-3">
          <Link href={`/movie/${movie.id}/watch`}>
            <button className="btn-primary h-8 xs:h-9 sm:h-10 md:h-11 px-3 xs:px-4 sm:px-5 md:px-6 text-[10px] xs:text-xs sm:text-sm rounded-lg sm:rounded-xl">
              <IconPlayerPlay className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="currentColor" stroke={1.5} />
              <span className="hidden xs:inline">Watch</span>
              <span className="xs:hidden">Play</span>
            </button>
          </Link>
          <Link href={`/movie/${movie.id}`}>
            <button className="btn-secondary h-8 xs:h-9 sm:h-10 md:h-11 px-3 xs:px-4 sm:px-5 md:px-6 text-[10px] xs:text-xs sm:text-sm rounded-lg sm:rounded-xl">
              <IconInfoCircle className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" stroke={1.5} />
              <span className="hidden xs:inline">Info</span>
              <span className="xs:hidden">Details</span>
            </button>
          </Link>
        </div>
      </div>

      <button
        onClick={prev}
        className="carousel-dot absolute left-2 xs:left-3 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full glass bg-black/40 text-white hover:bg-black/60 transition-colors z-10 flex items-center justify-center"
        aria-label="Previous movie"
      >
        <IconChevronLeft className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" stroke={2} />
      </button>
      <button
        onClick={next}
        className="carousel-dot absolute right-2 xs:right-3 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full glass bg-black/40 text-white hover:bg-black/60 transition-colors z-10 flex items-center justify-center"
        aria-label="Next movie"
      >
        <IconChevronRight className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" stroke={2} />
      </button>

      <div className="absolute bottom-3 sm:bottom-4 right-4 sm:right-6 flex items-center gap-2 z-10 hidden sm:flex">
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`carousel-dot h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-accent" : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
