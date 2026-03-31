import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/app/lib/types";
import { backdropUrl } from "@/app/lib/tmdb";

export default function Hero({ movie }: { movie: Movie }) {
  return (
    <section className="relative w-full aspect-video max-h-[560px] overflow-hidden rounded-xl border border-border">
      <Image
        src={backdropUrl(movie.backdrop_path)}
        alt={movie.title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
        <span className="text-xs font-medium text-accent uppercase tracking-widest mb-2">
          Featured
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-2xl">
          {movie.title}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-xl line-clamp-3">
          {movie.overview}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm">
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
            <span className="text-muted-foreground">/ 10</span>
          </div>
          <span className="text-muted-foreground">
            {movie.release_date?.slice(0, 4)}
          </span>
        </div>
        <div className="mt-5 flex gap-3">
          <Link
            href={`/movie/${movie.id}/watch`}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-accent text-accent-foreground font-medium text-sm hover:bg-emerald-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            Watch Now
          </Link>
          <Link
            href={`/movie/${movie.id}`}
            className="inline-flex items-center h-10 px-5 rounded-md border border-zinc-600 text-sm font-medium hover:bg-zinc-800 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </section>
  );
}
