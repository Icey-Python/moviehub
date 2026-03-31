import { notFound } from "next/navigation";
import Player from "@/app/components/Player";
import { getMovie } from "@/app/lib/tmdb";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieId = Number(id);
  if (isNaN(movieId)) notFound();

  let title = "Movie";
  try {
    const movie = await getMovie(movieId);
    title = movie.title;
  } catch {
    // keep default title
  }

  return <Player movieId={movieId} movieTitle={title} />;
}
