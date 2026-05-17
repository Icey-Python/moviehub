import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/app/lib/types";
import { backdropUrl } from "@/app/lib/tmdb";
import { IconPlayerPlay, IconStar, IconInfoCircle } from "@tabler/icons-react";

export default function Hero({ movie }: { movie: Movie }) {
  return (
    <section className="relative w-full aspect-video max-h-[600px] overflow-hidden rounded-2xl border border-border/50">
      <Image
        src={backdropUrl(movie.backdrop_path)}
        alt={movie.title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent opacity-50" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-16">
        <span className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-2">
          Featured
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
          {movie.title}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl line-clamp-3 leading-relaxed">
          {movie.overview}
        </p>
        <div className="mt-4 flex items-center gap-4">
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
        <div className="mt-6 flex gap-3">
          <Link href={`/movie/${movie.id}/watch`}>
            <button className="btn-primary rounded-xl">
              <IconPlayerPlay className="w-5 h-5" fill="currentColor" stroke={1.5} />
              Watch Now
            </button>
          </Link>
          <Link href={`/movie/${movie.id}`}>
            <button className="btn-secondary rounded-xl">
              <IconInfoCircle className="w-5 h-5" stroke={1.5} />
              Details
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
