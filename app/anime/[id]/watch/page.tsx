import { notFound } from "next/navigation";
import AnimePlayer from "@/app/components/AnimePlayer";
import { getAnime } from "@/app/lib/anilist";

export default async function WatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ep?: string }>;
}) {
  const { id } = await params;
  const { ep } = await searchParams;
  const animeId = Number(id);
  if (isNaN(animeId)) notFound();

  let anime;
  try {
    anime = await getAnime(animeId);
  } catch {
    notFound();
  }

  if (!anime || !anime.episodes) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col z-50">
        <div className="flex items-center justify-between h-12 px-4 bg-zinc-950 border-b border-zinc-800 shrink-0">
          <a
            href={`/anime/${animeId}`}
            className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </a>
          <span className="text-xs text-zinc-400">{anime?.title.english || anime?.title.romaji}</span>
          <div className="w-16" />
        </div>
        <div className="flex-1 flex items-center justify-center bg-zinc-950">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-zinc-900 flex items-center justify-center">
              <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white">No Episodes Found</h2>
            <p className="text-sm text-zinc-400 max-w-md">
              This anime is not available for streaming right now.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const episode = ep ? Number(ep) : 1;

  return (
    <AnimePlayer
      animeId={animeId}
      animeTitle={anime.title.english || anime.title.romaji}
      episodes={anime.episodes}
      episode={episode}
      anilistId={anime.id}
    />
  );
}
