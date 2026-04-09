import Navbar from "@/app/components/Navbar";
import HeroCarousel from "@/app/components/HeroCarousel";
import MovieGrid from "@/app/components/MovieGrid";
import { getTrending, getPopular, getTopRated, getTrendingTV, getPopularTV, getTopRatedTV, searchMovies, searchTVShows, getMovieLogo } from "@/app/lib/tmdb";
import { getTrendingAnime, getPopularAnime, getTopRatedAnime, searchAnime } from "@/app/lib/anilist";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : undefined;

  if (query) {
    const [movies, tvShows, anime] = await Promise.all([
      searchMovies(query),
      searchTVShows(query),
      searchAnime(query),
    ]);

    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 space-y-8 sm:space-y-10 md:space-y-12">
          <MovieGrid movies={movies} title={`Movies for "${query}"`} />
          {tvShows.length > 0 && (
            <MovieGrid movies={tvShows} title={`TV Shows for "${query}"`} isTV />
          )}
          {anime.media.length > 0 && (
            <MovieGrid movies={anime.media} title={`Anime for "${query}"`} isAnime />
          )}
        </main>
      </>
    );
  }

  const [trending, popular, topRated, trendingTV, popularTV, topRatedTV, trendingAnime, popularAnime, topRatedAnime] = await Promise.all([
    getTrending(),
    getPopular(),
    getTopRated(),
    getTrendingTV(),
    getPopularTV(),
    getTopRatedTV(),
    getTrendingAnime(undefined, 10),
    getPopularAnime(undefined, 10),
    getTopRatedAnime(undefined, 10),
  ]);

  const featured = trending.slice(0, 5);
  const logos = await Promise.all(
    featured.map((m) => getMovieLogo(m.id).catch(() => null))
  );

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 space-y-10 sm:space-y-12 md:space-y-14">
        {featured.length > 0 && <HeroCarousel movies={featured} logos={logos} />}
        <MovieGrid movies={trending} title="Trending Movies" />
        <MovieGrid movies={popular} title="Popular Movies" />
        <MovieGrid movies={topRated} title="Top Rated Movies" />
        <MovieGrid movies={trendingTV} title="Trending TV Shows" isTV />
        <MovieGrid movies={popularTV} title="Popular TV Shows" isTV />
        <MovieGrid movies={topRatedTV} title="Top Rated TV Shows" isTV />
        <MovieGrid movies={trendingAnime.media} title="Trending Anime" isAnime />
        <MovieGrid movies={popularAnime.media} title="Popular Anime" isAnime />
        <MovieGrid movies={topRatedAnime.media} title="Top Rated Anime" isAnime />
      </main>
    </>
  );
}
