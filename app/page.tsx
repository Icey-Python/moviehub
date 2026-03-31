import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import MovieGrid from "@/app/components/MovieGrid";
import { getTrending, getPopular, getTopRated, searchMovies } from "@/app/lib/tmdb";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : undefined;

  if (query) {
    const movies = await searchMovies(query);

    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-10">
          <MovieGrid movies={movies} title={`Results for "${query}"`} />
        </main>
      </>
    );
  }

  const [trending, popular, topRated] = await Promise.all([
    getTrending(),
    getPopular(),
    getTopRated(),
  ]);

  const hero = trending[0];

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-10">
        {hero && <Hero movie={hero} />}
        <MovieGrid movies={trending} title="Trending This Week" />
        <MovieGrid movies={popular} title="Popular" />
        <MovieGrid movies={topRated} title="Top Rated" />
      </main>
    </>
  );
}
