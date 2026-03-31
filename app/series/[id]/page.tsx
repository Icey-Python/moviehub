import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { getTVShow, getTVShowCredits, posterUrl, backdropUrl } from "@/app/lib/tmdb";

export default async function TVDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tvId = Number(id);
  
  if (isNaN(tvId)) {
    notFound();
  }

  let tv, credits;
  try {
    [tv, credits] = await Promise.all([
      getTVShow(tvId),
      getTVShowCredits(tvId),
    ]);
  } catch (error) {
    console.error("Error fetching TV show:", error);
    notFound();
  }

  if (!tv) {
    notFound();
  }

  const topCast = credits.cast.slice(0, 12);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="relative w-full aspect-video max-h-[480px] overflow-hidden rounded-xl border border-border mb-8">
          <Image
            src={backdropUrl(tv.backdrop_path)}
            alt={tv.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/60" />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="shrink-0">
            <div className="relative w-48 md:w-64 aspect-[2/3] rounded-lg overflow-hidden border border-border mx-auto md:mx-0">
              <Image
                src={posterUrl(tv.poster_path, "w500")}
                alt={tv.name}
                fill
                sizes="(max-width: 768px) 192px, 256px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {tv.name}
            </h1>
            {tv.tagline && (
              <p className="text-muted-foreground italic mt-1">{tv.tagline}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">{tv.vote_average.toFixed(1)}</span>
                <span className="text-muted-foreground">({tv.vote_count.toLocaleString()} votes)</span>
              </span>
              <span className="text-muted-foreground">|</span>
              <span>{tv.first_air_date}</span>
              {tv.number_of_seasons && tv.number_of_episodes && (
                <>
                  <span className="text-muted-foreground">|</span>
                  <span>{tv.number_of_seasons} seasons, {tv.number_of_episodes} episodes</span>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {tv.genres.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-muted border border-border"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                href={`/series/${tv.id}/watch`}
                className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-accent text-accent-foreground font-medium text-sm hover:bg-emerald-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Watch Now
              </Link>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Overview</h2>
              <p className="text-zinc-300 leading-relaxed">{tv.overview}</p>
            </div>
          </div>
        </div>

        {topCast.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4">Top Cast</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {topCast.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="relative w-full aspect-square rounded-full overflow-hidden border border-border bg-muted mx-auto">
                    <Image
                      src={
                        member.profile_path
                          ? posterUrl(member.profile_path, "w185")
                          : "https://placehold.co/185x185/18181b/a1a1aa?text=?"
                      }
                      alt={member.name}
                      fill
                      sizes="185px"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium truncate">{member.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {member.character}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}