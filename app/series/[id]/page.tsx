import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { getTVShow, getTVShowCredits, posterUrl, backdropUrl } from "@/app/lib/tmdb";
import { IconPlayerPlay, IconStar, IconCalendar, IconDeviceTv } from "@tabler/icons-react";

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
  } catch {
    notFound();
  }

  if (!tv) {
    notFound();
  }

  const topCast = credits.cast.slice(0, 12);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 sm:px-8 py-12">
        <div className="relative w-full aspect-video max-h-[480px] overflow-hidden rounded-2xl border border-glass-border mb-10">
          <Image
            src={backdropUrl(tv.backdrop_path)}
            alt={tv.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="shrink-0">
            <div className="relative w-52 md:w-64 aspect-[2/3] rounded-xl overflow-hidden border border-glass-border mx-auto md:mx-0">
              <Image
                src={posterUrl(tv.poster_path, "w500")}
                alt={tv.name}
                fill
                sizes="(max-width: 768px) 208px, 256px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {tv.name}
            </h1>
            {tv.tagline && (
              <p className="text-muted-foreground italic mt-2">{tv.tagline}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-5 text-sm">
              <span className="flex items-center gap-1.5">
                <IconStar className="w-4 h-4 text-amber-400" fill="currentColor" stroke={1.5} />
                <span className="font-semibold">{tv.vote_average.toFixed(1)}</span>
                <span className="text-muted-foreground">({tv.vote_count.toLocaleString()} votes)</span>
              </span>
              <span className="text-muted-foreground/50">|</span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <IconCalendar className="w-4 h-4" stroke={1.5} />
                {tv.first_air_date}
              </span>
              {tv.number_of_seasons && tv.number_of_episodes && (
                <>
                  <span className="text-muted-foreground/50">|</span>
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <IconDeviceTv className="w-4 h-4" stroke={1.5} />
                    {tv.number_of_seasons} seasons, {tv.number_of_episodes} episodes
                  </span>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-2.5 mt-5">
              {tv.genres.map((g) => (
                <span
                  key={g.id}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium glass"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <Link
                href={`/series/${tv.id}/watch`}
                className="inline-flex items-center gap-2.5 h-12 px-7 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors"
              >
                <IconPlayerPlay className="w-5 h-5" fill="currentColor" stroke={1.5} />
                Watch Now
              </Link>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3">Overview</h2>
              <p className="text-zinc-400 leading-relaxed">{tv.overview}</p>
            </div>
          </div>
        </div>

        {topCast.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-bold mb-6">Top Cast</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
              {topCast.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="relative w-full aspect-square rounded-full overflow-hidden border border-glass-border bg-muted mx-auto">
                    <Image
                      src={
                        member.profile_path
                          ? posterUrl(member.profile_path, "w185")
                          : "https://placehold.co/185x185/0a0a0a/71717a?text=?"
                      }
                      alt={member.name}
                      fill
                      sizes="185px"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-3 text-xs font-medium truncate">{member.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate mt-0.5">
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
