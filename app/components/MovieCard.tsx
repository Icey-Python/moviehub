import Image from "next/image";
import Link from "next/link";
import type { Movie, TVShow, AnilistAnime } from "@/app/lib/types";
import { posterUrl } from "@/app/lib/tmdb";
import { IconStar, IconArrowRight } from "@tabler/icons-react";

type MediaItem = Movie | TVShow | AnilistAnime;

function isAnilistItem(item: MediaItem): item is AnilistAnime {
  return "coverImage" in item;
}

export default function MovieCard({ movie, isTV = false, isAnime = false }: { movie: MediaItem; isTV?: boolean; isAnime?: boolean }) {
  const isAL = isAnilistItem(movie);
  const title = isAL
    ? movie.title.english || movie.title.romaji
    : "name" in movie
    ? movie.name
    : movie.title;
  const date = isAL
    ? movie.seasonYear?.toString()
    : "release_date" in movie
    ? movie.release_date
    : "first_air_date" in movie
    ? movie.first_air_date
    : undefined;
  const year = date?.slice(0, 4) ?? "—";
  const rating = isAL
    ? (movie.averageScore ? (movie.averageScore / 10).toFixed(1) : "N/A")
    : movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const href = isAnime
    ? `/anime/${movie.id}`
    : isTV
    ? `/series/${(movie as TVShow).id}`
    : `/movie/${(movie as Movie).id}`;
  const imageSrc = isAL
    ? (movie.coverImage.large || "https://placehold.co/500x750/0a0a0a/71717a?text=No+Image")
    : posterUrl(movie.poster_path);

  return (
    <Link
      href={href}
      className="group block shrink-0 w-[calc(50%-0.375rem)] xs:w-[calc(33.333%-0.5rem)] sm:w-[calc(25%-0.75rem)] md:w-[140px] lg:w-[160px] xl:w-[180px] snap-start"
      aria-label={`${title} (${year})`}
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-background-elevated border border-border/50 transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-lg group-hover:shadow-accent/10">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="90px sm:140px md:160px lg:180px xl:200px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {rating !== "N/A" && (
          <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 text-[10px] font-semibold text-white flex items-center gap-1">
            <IconStar className="w-3 h-3 text-amber-400" fill="currentColor" stroke={1.5} />
            {rating}
          </div>
        )}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <IconArrowRight className="w-4 h-4 text-white" stroke={2} />
          </div>
        </div>
      </div>
      <div className="mt-2 px-0.5">
        <h3 className="font-semibold text-xs sm:text-sm truncate text-card-foreground group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{year}</p>
      </div>
    </Link>
  );
}
