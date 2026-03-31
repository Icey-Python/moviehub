import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { getAnime } from "@/app/lib/anilist";

export default async function AnimeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const animeId = Number(id);
  
  if (isNaN(animeId)) {
    notFound();
  }

  let anime;
  try {
    anime = await getAnime(animeId);
  } catch (error) {
    console.error("Error fetching anime:", error);
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
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {anime.bannerImage && (
          <div className="relative w-full aspect-video max-h-[480px] overflow-hidden rounded-xl border border-border mb-8">
            <Image
              src={anime.bannerImage}
              alt={title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-background/60" />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <div className="shrink-0">
            <div className="relative w-48 md:w-64 aspect-[2/3] rounded-lg overflow-hidden border border-border mx-auto md:mx-0">
              <Image
                src={anime.coverImage.large || "https://placehold.co/384x576/18181b/a1a1aa?text=No+Image"}
                alt={title}
                fill
                sizes="(max-width: 768px) 192px, 256px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {title}
            </h1>
            {anime.title.native && (
              <p className="text-muted-foreground mt-1">{anime.title.native}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">{score}</span>
                <span className="text-muted-foreground">({anime.popularity?.toLocaleString()} users)</span>
              </span>
              <span className="text-muted-foreground">|</span>
              <span>{format}</span>
              {anime.episodes && (
                <>
                  <span className="text-muted-foreground">|</span>
                  <span>{anime.episodes} episodes</span>
                </>
              )}
              {duration && (
                <>
                  <span className="text-muted-foreground">|</span>
                  <span>{duration}</span>
                </>
              )}
              {season && (
                <>
                  <span className="text-muted-foreground">|</span>
                  <span>{season}</span>
                </>
              )}
              <span className="text-muted-foreground">|</span>
              <span>{status}</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {anime.genres.map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-muted border border-border"
                >
                  {g}
                </span>
              ))}
            </div>

            {studios.length > 0 && (
              <p className="text-sm text-muted-foreground mt-3">
                Studio: {studios.map((s) => s.name).join(", ")}
              </p>
            )}

            <div className="mt-6 flex gap-3">
              <Link
                href={`/anime/${anime.id}/watch`}
                className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-accent text-accent-foreground font-medium text-sm hover:bg-emerald-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Watch Now
              </Link>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Synopsis</h2>
              <div
                className="text-zinc-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: anime.description || "No synopsis available." }}
              />
            </div>
          </div>
        </div>

        {topCharacters.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4">Characters</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {topCharacters.map(({ node, role }) => (
                <div key={node.id} className="text-center">
                  <div className="relative w-full aspect-square rounded-full overflow-hidden border border-border bg-muted mx-auto">
                    <Image
                      src={
                        node.image?.large ||
                        node.image?.medium ||
                        "https://placehold.co/185x185/18181b/a1a1aa?text=?"
                      }
                      alt={node.name.full}
                      fill
                      sizes="185px"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium truncate">{node.name.full}</p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {role}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {recommendations.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4">Recommendations</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recommendations.map(({ node }) => (
                <Link
                  key={node.mediaRecommendation.id}
                  href={`/anime/${node.mediaRecommendation.id}`}
                  className="group block"
                >
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-border">
                    <Image
                      src={node.mediaRecommendation.coverImage.large || "https://placehold.co/384x576/18181b/a1a1aa?text=No+Image"}
                      alt={node.mediaRecommendation.title.english || node.mediaRecommendation.title.romaji}
                      fill
                      sizes="185px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium truncate">
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
