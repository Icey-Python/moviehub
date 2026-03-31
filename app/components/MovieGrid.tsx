import type { Movie, TVShow } from "@/app/lib/types";
import MovieCard from "./MovieCard";

type MediaItem = Movie | TVShow;

export default function MovieGrid({
  movies,
  title,
  isTV = false,
}: {
  movies: MediaItem[];
  title?: string;
  isTV?: boolean;
}) {
  return (
    <section>
      {title && (
        <h2 className="text-xl font-bold mb-4 tracking-tight">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} isTV={isTV} />
        ))}
      </div>
      {movies.length === 0 && (
        <p className="text-muted-foreground text-center py-16">No results found.</p>
      )}
    </section>
  );
}
