import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/app/lib/types";
import { backdropUrl } from "@/app/lib/tmdb";
import { IconPlayerPlay, IconStar, IconInfoCircle } from "@tabler/icons-react";

export default function Hero({ movie }: { movie: Movie }) {
  return (
    <section className="relative w-full aspect-video max-h-[240px] xs:max-h-[320px] sm:max-h-[440px] md:max-h-[520px] lg:max-h-[600px] overflow-hidden rounded-xl sm:rounded-2xl border border-border/50">
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
      <div className="absolute inset-0 flex flex-col justify-end p-4 xs:p-5 sm:p-8 md:p-10 lg:p-16">
        <span className="text-[10px] xs:text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-1.5 xs:mb-2">
          Featured
        </span>
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-[240px] xs:max-w-sm sm:max-w-2xl md:max-w-3xl leading-tight">
          {movie.title}
        </h1>
        <p className="mt-2 xs:mt-2.5 sm:mt-3 text-xs xs:text-sm sm:text-base text-zinc-400 max-w-[200px] xs:max-w-sm sm:max-w-xl line-clamp-2 sm:line-clamp-3 leading-relaxed">
          {movie.overview}
        </p>
        <div className="mt-3 xs:mt-3.5 sm:mt-4 flex items-center gap-3 xs:gap-3.5 sm:gap-4">
          <div className="flex items-center gap-1 xs:gap-1.5 text-xs xs:text-sm">
            <IconStar className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-amber-400" fill="currentColor" stroke={1.5} />
            <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
            <span className="text-muted-foreground">/ 10</span>
          </div>
          <span className="text-muted-foreground hidden xs:inline">|</span>
          <span className="text-xs xs:text-sm text-zinc-400">
            {movie.release_date?.slice(0, 4)}
          </span>
        </div>
        <div className="mt-4 xs:mt-5 sm:mt-6 flex gap-2 xs:gap-2.5 sm:gap-3">
          <Link href={`/movie/${movie.id}/watch`}>
            <button className="btn-primary h-9 xs:h-10 sm:h-11 px-4 xs:px-5 sm:px-6 text-xs sm:text-sm rounded-lg sm:rounded-xl">
              <IconPlayerPlay className="w-4 h-4 xs:w-5 xs:h-5" fill="currentColor" stroke={1.5} />
              Watch Now
            </button>
          </Link>
          <Link href={`/movie/${movie.id}`}>
            <button className="btn-secondary h-9 xs:h-10 sm:h-11 px-4 xs:px-5 sm:px-6 text-xs sm:text-sm rounded-lg sm:rounded-xl">
              <IconInfoCircle className="w-4 h-4 xs:w-5 xs:h-5" stroke={1.5} />
              Details
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
