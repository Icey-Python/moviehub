import Image from "next/image";
import Link from "next/link";
import type { Movie, TVShow, AnilistAnime } from "@/app/lib/types";
import { posterUrl } from "@/app/lib/tmdb";
import { IconStar } from "@tabler/icons-react";

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
      className="group block shrink-0 w-[120px] xs:w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] snap-start"
    >
      <div className="relative aspect-[2/3] rounded-lg sm:rounded-xl overflow-hidden glass-subtle transition-colors duration-200 group-hover:border-white/[0.05]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 480px) 140px, (max-width: 640px) 160px, (max-width: 768px) 180px, (max-width: 1024px) 200px, 200px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {rating !== "N/A" && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-md sm:rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-white flex items-center gap-0.5 sm:gap-1">
            <IconStar className="w-2.5 h-2.5 sm:w-3 h-3 text-amber-400" fill="currentColor" stroke={1.5} />
            {rating}
          </div>
        )}
      </div>
      <div className="mt-2 sm:mt-3 px-0.5">
        <h3 className="font-semibold text-xs sm:text-sm truncate text-card-foreground">
          {title}
        </h3>
        <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{year}</p>
      </div>
    </Link>
  );
}
