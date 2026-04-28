import Navbar from "@/app/components/Navbar";
import HeroCarousel from "@/app/components/HeroCarousel";
import MovieGrid from "@/app/components/MovieGrid";
import ContinueWatching from "@/app/components/ContinueWatching";
import { getTrending, getPopular, getTopRated, getTrendingTV, getPopularTV, getTopRatedTV, searchMovies, searchTVShows, getMovieLogo } from "@/app/lib/tmdb";
import { getTrendingAnime, getPopularAnime, getTopRatedAnime, searchAnime, type AnilistMedia } from "@/app/lib/anilist";

async function getAnilistSafe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    console.warn(`Anilist API failed: ${e}`);
    return fallback;
  }
}

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
      getAnilistSafe(() => searchAnime(query), { media: [] as AnilistMedia[], pageInfo: { currentPage: 1, lastPage: 1, hasNextPage: false, perPage: 10, total: 0 } }),
    ]);

    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 space-y-6 sm:space-y-8">
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
    getAnilistSafe(() => getTrendingAnime(undefined, 10), { media: [] as AnilistMedia[], pageInfo: { currentPage: 1, lastPage: 1, hasNextPage: false, perPage: 10, total: 0 } }),
    getAnilistSafe(() => getPopularAnime(undefined, 10), { media: [] as AnilistMedia[], pageInfo: { currentPage: 1, lastPage: 1, hasNextPage: false, perPage: 10, total: 0 } }),
    getAnilistSafe(() => getTopRatedAnime(undefined, 10), { media: [] as AnilistMedia[], pageInfo: { currentPage: 1, lastPage: 1, hasNextPage: false, perPage: 10, total: 0 } }),
  ]);

  const featured = trending.slice(0, 5);
  const logos = await Promise.all(
    featured.map((m) => getMovieLogo(m.id).catch(() => null))
  );

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 space-y-6 sm:space-y-8 md:space-y-10">
        {featured.length > 0 && <HeroCarousel movies={featured} logos={logos} />}
        <ContinueWatching />
        <MovieGrid movies={trending} title="Trending Movies" />
        <MovieGrid movies={popular} title="Popular Movies" />
        <MovieGrid movies={topRated} title="Top Rated Movies" />
        <MovieGrid movies={trendingTV} title="Trending TV Shows" isTV />
        <MovieGrid movies={popularTV} title="Popular TV Shows" isTV />
        <MovieGrid movies={topRatedTV} title="Top Rated TV Shows" isTV />
        {trendingAnime.media.length > 0 && (
          <div className="hidden sm:block">
            <MovieGrid movies={trendingAnime.media} title="Trending Anime" isAnime />
            <MovieGrid movies={popularAnime.media} title="Popular Anime" isAnime />
            <MovieGrid movies={topRatedAnime.media} title="Top Rated Anime" isAnime />
          </div>
        )}
      </main>
    </>
  );
}
