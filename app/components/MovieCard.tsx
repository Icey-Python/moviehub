import Image from "next/image";
import Link from "next/link";
import type { Movie, TVShow, AnilistAnime } from "@/app/lib/types";
import { posterUrl } from "@/app/lib/tmdb";

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
    : movie.vote_average.toFixed(1);
  const href = isAnime
    ? `/anime/${movie.id}`
    : isTV
    ? `/series/${(movie as TVShow).id}`
    : `/movie/${(movie as Movie).id}`;
  const imageSrc = isAL
    ? (movie.coverImage.large || "https://placehold.co/500x750/18181b/a1a1aa?text=No+Image")
    : posterUrl(movie.poster_path);

  return (
    <Link
      href={href}
      className="group block rounded-lg overflow-hidden bg-card border border-border transition-colors hover:border-zinc-700"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-md px-2 py-1 text-xs font-semibold text-white flex items-center gap-1">
          <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {rating}
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm truncate text-card-foreground">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">{year}</p>
      </div>
    </Link>
  );
}
