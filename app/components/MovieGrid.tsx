import type { Movie } from "@/app/lib/types";
import MovieCard from "./MovieCard";

export default function MovieGrid({
  movies,
  title,
}: {
  movies: Movie[];
  title?: string;
}) {
  return (
    <section>
      {title && (
        <h2 className="text-xl font-bold mb-4 tracking-tight">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {movies.length === 0 && (
        <p className="text-muted-foreground text-center py-16">No movies found.</p>
      )}
    </section>
  );
}
