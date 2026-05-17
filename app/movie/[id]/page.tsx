import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import TrailerButton from "@/app/components/TrailerButton";
import { getMovie, getMovieCredits, getMovieLogo, getMovieTrailer, posterUrl, backdropUrl } from "@/app/lib/tmdb";
import { IconPlayerPlay, IconStar, IconClock, IconCalendar, IconUsers } from "@tabler/icons-react";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieId = Number(id);
  
  if (isNaN(movieId)) {
    notFound();
  }

  let movie, credits, logo, trailer;
  try {
    [movie, credits, logo, trailer] = await Promise.all([
      getMovie(movieId),
      getMovieCredits(movieId),
      getMovieLogo(movieId).catch(() => null),
      getMovieTrailer(movieId),
    ]);
  } catch {
    notFound();
  }

  if (!movie) {
    notFound();
  }

  const topCast = credits.cast.slice(0, 12);
  const runtimeH = Math.floor(movie.runtime / 60);
  const runtimeM = movie.runtime % 60;

  return (
    <>
      <Navbar />
      <main className="page-container py-4 xs:py-6 sm:py-8 md:py-10 lg:py-12">
        {/* Backdrop */}
        <div className="relative w-full aspect-video max-h-[200px] xs:max-h-[280px] sm:max-h-[360px] md:max-h-[440px] overflow-hidden rounded-xl sm:rounded-2xl border border-border/50 mb-4 xs:mb-6 sm:mb-8 md:mb-10">
          <Image
            src={backdropUrl(movie.backdrop_path)}
            alt={movie.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          {logo && (
            <div className="absolute bottom-3 xs:bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 left-3 xs:left-4 sm:left-6 md:left-8 lg:left-12">
              <img
                src={logo}
                alt={movie.title}
                className="w-24 xs:w-32 sm:w-40 md:w-48 lg:w-64 h-auto drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 xs:gap-6 sm:gap-8 lg:gap-10">
          {/* Poster */}
          <div className="shrink-0 hidden sm:block">
            <div className="relative w-32 xs:w-40 sm:w-48 md:w-56 lg:w-60 aspect-[2/3] rounded-lg sm:rounded-xl overflow-hidden border border-border/50 mx-auto md:mx-0 bg-background-elevated">
              <Image
                src={posterUrl(movie.poster_path, "w500")}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 176px, 240px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-foreground-secondary italic mt-2">{movie.tagline}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5 text-sm">
              <span className="flex items-center gap-1.5">
                <IconStar className="w-4 h-4 text-amber-400" fill="currentColor" stroke={1.5} />
                <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                <span className="text-muted-foreground">({movie.vote_count.toLocaleString()})</span>
              </span>
              <span className="text-border/50">|</span>
              <span className="flex items-center gap-1.5 text-foreground-secondary">
                <IconCalendar className="w-4 h-4" stroke={1.5} />
                {movie.release_date}
              </span>
              {movie.runtime > 0 && (
                <>
                  <span className="text-border/50">|</span>
                  <span className="flex items-center gap-1.5 text-foreground-secondary">
                    <IconClock className="w-4 h-4" stroke={1.5} />
                    {runtimeH}h {runtimeM}m
                  </span>
                </>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mt-5">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="h-8 px-3 rounded-lg text-xs font-medium glass flex items-center"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div className="mt-6 sm:mt-8">
              <h2 className="text-lg font-semibold mb-3">Overview</h2>
              <p className="text-foreground-secondary leading-relaxed">{movie.overview}</p>
            </div>

            {/* Actions */}
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
              <Link href={`/movie/${movie.id}/watch`}>
                <button className="btn-primary rounded-xl">
                  <IconPlayerPlay className="w-5 h-5" fill="currentColor" stroke={1.5} />
                  Watch Now
                </button>
              </Link>
              {trailer && <TrailerButton videoKey={trailer.key} title={movie.title} />}
            </div>
          </div>
        </div>

        {/* Cast */}
        {topCast.length > 0 && (
          <section className="mt-8 xs:mt-10 sm:mt-12 md:mt-14">
            <div className="flex items-center justify-between mb-4 xs:mb-5 sm:mb-6">
              <h2 className="section-heading mb-0">Top Cast</h2>
              <Link
                href={`/movie/${movieId}/cast`}
                className="h-8 xs:h-9 sm:h-10 px-3 xs:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm text-foreground-secondary hover:text-white transition-colors flex items-center gap-1 xs:gap-1.5"
              >
                <IconUsers className="w-4 h-4" stroke={1.5} />
                View All
              </Link>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6">
              {topCast.map((member) => (
                <Link
                  key={member.id}
                  href={`/person/${member.id}`}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative w-full aspect-square rounded-full overflow-hidden border border-border/50 bg-background-elevated">
                    <Image
                      src={
                        member.profile_path
                          ? posterUrl(member.profile_path, "w185")
                          : "https://placehold.co/185x185/0a0a0a/71717a?text=?"
                      }
                      alt={member.name}
                      fill
                      sizes="185px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="mt-3 text-xs sm:text-sm font-medium truncate w-full group-hover:text-accent transition-colors">{member.name}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground truncate w-full mt-0.5">
                    {member.character}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
