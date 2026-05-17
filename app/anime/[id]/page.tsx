import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import AnimeEpisodes from "@/app/components/AnimeEpisodes";
import { getAnime } from "@/app/lib/anilist";
import { IconPlayerPlay, IconStar, IconClock, IconCalendar } from "@tabler/icons-react";

export default async function AnimeDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ep?: string }>;
}) {
  const { id } = await params;
  const { ep } = await searchParams;
  const animeId = Number(id);
  const currentEpisode = ep ? Number(ep) : 1;
  
  if (isNaN(animeId)) {
    notFound();
  }

  let anime;
  try {
    anime = await getAnime(animeId);
  } catch {
    notFound();
  }

  if (!anime) {
    notFound();
  }

  const topCharacters = anime.characters.edges.slice(0, 12);
  const recommendations = anime.recommendations.edges.slice(0, 6);
  const studios = anime.studios.nodes.filter((s) => s.isAnimationStudio);
  const title = anime.title.english || anime.title.romaji;
  const score = anime.averageScore ? (anime.averageScore / 10).toFixed(1) : "N/A";
  const status = anime.status?.replace(/_/g, " ") || "Unknown";
  const format = anime.format || "TV";
  const season = anime.season && anime.seasonYear ? `${anime.season} ${anime.seasonYear}` : "";
  const duration = anime.duration ? `${anime.duration} min` : "";

  return (
    <>
      <Navbar />
      <main className="page-container py-4 xs:py-6 sm:py-8 md:py-10 lg:py-12">
        {anime.bannerImage && (
          <div className="relative w-full aspect-video max-h-[200px] xs:max-h-[280px] sm:max-h-[360px] md:max-h-[440px] overflow-hidden rounded-xl sm:rounded-2xl border border-border/50 mb-4 xs:mb-6 sm:mb-8 md:mb-10">
            <Image
              src={anime.bannerImage}
              alt={title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 xs:gap-6 sm:gap-8 lg:gap-10">
          <div className="shrink-0 hidden sm:block">
            <div className="relative w-32 xs:w-40 sm:w-48 md:w-56 lg:w-60 aspect-[2/3] rounded-lg sm:rounded-xl overflow-hidden border border-border/50 mx-auto md:mx-0 bg-background-elevated">
              <Image
                src={anime.coverImage.large || "https://placehold.co/384x576/0a0a0a/71717a?text=No+Image"}
                alt={title}
                fill
                sizes="(max-width: 768px) 176px, 240px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              {title}
            </h1>
            {anime.title.native && (
              <p className="text-foreground-secondary mt-2">{anime.title.native}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5 text-sm">
              <span className="flex items-center gap-1.5">
                <IconStar className="w-4 h-4 text-amber-400" fill="currentColor" stroke={1.5} />
                <span className="font-semibold">{score}</span>
                <span className="text-muted-foreground">({anime.popularity?.toLocaleString()} users)</span>
              </span>
              <span className="text-border/50">|</span>
              <span className="text-foreground-secondary">{format}</span>
              {anime.episodes && (
                <>
                  <span className="text-border/50">|</span>
                  <span className="flex items-center gap-1.5 text-foreground-secondary">
                    <IconCalendar className="w-4 h-4" stroke={1.5} />
                    {anime.episodes} episodes
                  </span>
                </>
              )}
              {duration && (
                <>
                  <span className="text-border/50">|</span>
                  <span className="flex items-center gap-1.5 text-foreground-secondary">
                    <IconClock className="w-4 h-4" stroke={1.5} />
                    {duration}
                  </span>
                </>
              )}
              {season && (
                <>
                  <span className="text-border/50">|</span>
                  <span className="text-foreground-secondary">{season}</span>
                </>
              )}
              <span className="text-border/50">|</span>
              <span className="text-foreground-secondary">{status}</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              {anime.genres.map((g) => (
                <span
                  key={g}
                  className="h-8 px-3 rounded-lg text-xs font-medium glass flex items-center"
                >
                  {g}
                </span>
              ))}
            </div>

            {studios.length > 0 && (
              <p className="text-sm text-foreground-secondary mt-4">
                Studio: {studios.map((s) => s.name).join(", ")}
              </p>
            )}

            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
              <Link href={`/anime/${anime.id}/watch`}>
                <button className="btn-primary rounded-xl">
                  <IconPlayerPlay className="w-5 h-5" fill="currentColor" stroke={1.5} />
                  Watch Now
                </button>
              </Link>
            </div>

            <div className="mt-6 sm:mt-8">
              <h2 className="text-lg font-semibold mb-3">Synopsis</h2>
              <div
                className="text-foreground-secondary leading-relaxed"
                dangerouslySetInnerHTML={{ __html: anime.description || "No synopsis available." }}
              />
            </div>
          </div>
        </div>

        {anime.episodes && anime.episodes > 1 && (
          <AnimeEpisodes
            animeId={animeId}
            animeTitle={title}
            episodes={anime.episodes}
            currentEpisode={currentEpisode}
          />
        )}

        {topCharacters.length > 0 && (
          <section className="mt-12 sm:mt-14">
            <h2 className="section-heading">Characters</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6">
              {topCharacters.map(({ node, role }) => (
                <div key={node.id} className="text-center">
                  <div className="relative w-full aspect-square rounded-full overflow-hidden border border-border/50 bg-background-elevated mx-auto">
                    <Image
                      src={
                        node.image?.large ||
                        node.image?.medium ||
                        "https://placehold.co/185x185/0a0a0a/71717a?text=?"
                      }
                      alt={node.name.full}
                      fill
                      sizes="185px"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-3 text-xs sm:text-sm font-medium truncate">{node.name.full}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground truncate mt-0.5">
                    {role}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {recommendations.length > 0 && (
          <section className="mt-12 sm:mt-14">
            <h2 className="section-heading">Recommendations</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
              {recommendations.map(({ node }) => (
                <Link
                  key={node.mediaRecommendation.id}
                  href={`/anime/${node.mediaRecommendation.id}`}
                  className="group block"
                >
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-background-elevated border border-border/50 transition-all duration-300 group-hover:border-accent/30">
                    <Image
                      src={node.mediaRecommendation.coverImage.large || "https://placehold.co/384x576/0a0a0a/71717a?text=No+Image"}
                      alt={node.mediaRecommendation.title.english || node.mediaRecommendation.title.romaji}
                      fill
                      sizes="185px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-2 text-xs sm:text-sm font-medium truncate px-0.5 group-hover:text-accent transition-colors">
                    {node.mediaRecommendation.title.english || node.mediaRecommendation.title.romaji}
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
