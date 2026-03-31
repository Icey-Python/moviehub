import type { Movie, TVShow, AnilistAnime } from "@/app/lib/types";
import MovieCard from "./MovieCard";

type MediaItem = Movie | TVShow | AnilistAnime;

export default function MovieGrid({
  movies,
  title,
  isTV = false,
  isAnime = false,
}: {
  movies: MediaItem[];
  title?: string;
  isTV?: boolean;
  isAnime?: boolean;
}) {
  return (
    <section>
      {title && (
        <h2 className="text-xl font-bold mb-4 tracking-tight">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={isAnime ? (movie as AnilistAnime).id : movie.id}
            movie={movie}
            isTV={isTV}
            isAnime={isAnime}
          />
        ))}
      </div>
      {movies.length === 0 && (
        <p className="text-muted-foreground text-center py-16">No results found.</p>
      )}
    </section>
  );
}
