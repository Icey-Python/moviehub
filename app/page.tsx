import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import MovieGrid from "@/app/components/MovieGrid";
import { getTrending, getPopular, getTopRated, searchMovies, getTrendingTV, getPopularTV, getTopRatedTV, searchTVShows } from "@/app/lib/tmdb";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : undefined;

  if (query) {
    const [movies, tvShows] = await Promise.all([
      searchMovies(query),
      searchTVShows(query),
    ]);

    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-10">
          <MovieGrid movies={movies} title={`Movies for "${query}"`} />
          {tvShows.length > 0 && (
            <MovieGrid movies={tvShows} title={`TV Shows for "${query}"`} isTV />
          )}
        </main>
      </>
    );
  }

  const [trending, popular, topRated, trendingTV, popularTV, topRatedTV] = await Promise.all([
    getTrending(),
    getPopular(),
    getTopRated(),
    getTrendingTV(),
    getPopularTV(),
    getTopRatedTV(),
  ]);

  const hero = trending[0];

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-10">
        {hero && <Hero movie={hero} />}
        <MovieGrid movies={trending} title="Trending Movies" />
        <MovieGrid movies={popular} title="Popular Movies" />
        <MovieGrid movies={topRated} title="Top Rated Movies" />
        <MovieGrid movies={trendingTV} title="Trending TV Shows" isTV />
        <MovieGrid movies={popularTV} title="Popular TV Shows" isTV />
        <MovieGrid movies={topRatedTV} title="Top Rated TV Shows" isTV />
      </main>
    </>
  );
}
