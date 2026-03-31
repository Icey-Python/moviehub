import { notFound } from "next/navigation";
import Player from "@/app/components/Player";
import { getTVShow } from "@/app/lib/tmdb";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tvId = Number(id);
  if (isNaN(tvId)) notFound();

  let title = "TV Show";
  try {
    const tv = await getTVShow(tvId);
    title = tv.name;
  } catch {
    // keep default title
  }

  return <Player movieId={tvId} movieTitle={title} type="tv" />;
}