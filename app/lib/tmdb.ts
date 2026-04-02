import type { Movie, MovieDetail, TMDBResponse, Credits, TVShow, TVShowDetail, SeasonDetail, Person, PersonCredits } from "./types";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

function apiKey(): string {
  const key = process.env.TMDB_API_KEY;
  if (!key) throw new Error("TMDB_API_KEY is not set");
  return key;
}

async function tmdbFetch<T>(path: string): Promise<T> {
  const url = `${BASE_URL}${path}${path.includes("?") ? "&" : "?"}api_key=${apiKey()}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

export function posterUrl(path: string | null, size = "w500"): string {
  if (!path) return "https://placehold.co/500x750/18181b/a1a1aa?text=No+Image";
  return `${IMAGE_BASE}/${size}${path}`;
}

export function backdropUrl(path: string | null): string {
  if (!path) return "https://placehold.co/1280x720/18181b/a1a1aa?text=No+Image";
  return `${IMAGE_BASE}/w1280${path}`;
}

export function stillUrl(path: string | null): string {
  if (!path) return "https://placehold.co/300x169/18181b/a1a1aa?text=No+Image";
  return `${IMAGE_BASE}/w300${path}`;
}

export async function getTrending(): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBResponse<Movie>>("/trending/movie/week");
  return data.results;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBResponse<Movie>>(
    `/search/movie?query=${encodeURIComponent(query)}`
  );
  return data.results;
}

export async function getMovie(id: number): Promise<MovieDetail> {
  return tmdbFetch<MovieDetail>(`/movie/${id}`);
}

export async function getMovieCredits(id: number): Promise<Credits> {
  return tmdbFetch<Credits>(`/movie/${id}/credits`);
}

export async function getPopular(): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBResponse<Movie>>("/movie/popular");
  return data.results;
}

export async function getTopRated(): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBResponse<Movie>>("/movie/top_rated");
  return data.results;
}

export async function getTrendingTV(): Promise<TVShow[]> {
  const data = await tmdbFetch<TMDBResponse<TVShow>>("/trending/tv/week");
  return data.results;
}

export async function searchTVShows(query: string): Promise<TVShow[]> {
  const data = await tmdbFetch<TMDBResponse<TVShow>>(
    `/search/tv?query=${encodeURIComponent(query)}`
  );
  return data.results;
}

export async function getTVShow(id: number): Promise<TVShowDetail> {
  return tmdbFetch<TVShowDetail>(`/tv/${id}`);
}

export async function getTVShowCredits(id: number): Promise<Credits> {
  return tmdbFetch<Credits>(`/tv/${id}/credits`);
}

export async function getPopularTV(): Promise<TVShow[]> {
  const data = await tmdbFetch<TMDBResponse<TVShow>>("/tv/popular");
  return data.results;
}

export async function getTopRatedTV(): Promise<TVShow[]> {
  const data = await tmdbFetch<TMDBResponse<TVShow>>("/tv/top_rated");
  return data.results;
}

export async function getTVSeason(tvId: number, seasonNumber: number): Promise<SeasonDetail> {
  return tmdbFetch<SeasonDetail>(`/tv/${tvId}/season/${seasonNumber}`);
}

const ANIME_GENRE_ID = 16;

export async function getAnimeMovies(): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBResponse<Movie>>(
    `/discover/movie?with_genres=${ANIME_GENRE_ID}&sort_by=popularity.desc`
  );
  return data.results;
}

export async function getAnimeTV(): Promise<TVShow[]> {
  const data = await tmdbFetch<TMDBResponse<TVShow>>(
    `/discover/tv?with_genres=${ANIME_GENRE_ID}&sort_by=popularity.desc`
  );
  return data.results;
}

export async function getPerson(id: number): Promise<Person> {
  return tmdbFetch<Person>(`/person/${id}`);
}

export async function getPersonCredits(id: number): Promise<PersonCredits> {
  return tmdbFetch<PersonCredits>(`/person/${id}/combined_credits`);
}
