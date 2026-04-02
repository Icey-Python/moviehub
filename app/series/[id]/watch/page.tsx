import { notFound } from "next/navigation";
import Player from "@/app/components/Player";
import { getTVShow } from "@/app/lib/tmdb";

export default async function WatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ season?: string; ep?: string }>;
}) {
  const { id } = await params;
  const { season, ep } = await searchParams;
  const tvId = Number(id);
  if (isNaN(tvId)) notFound();

  const seasonNum = season ? Number(season) : undefined;
  const episodeNum = ep ? Number(ep) : undefined;

  let title = "TV Show";
  try {
    const tv = await getTVShow(tvId);
    title = tv.name;
  } catch {
    // keep default title
  }

  return <Player movieId={tvId} movieTitle={title} type="tv" season={seasonNum} episode={episodeNum} />;
}