import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { getTVShow, getTVShowCredits, posterUrl } from "@/app/lib/tmdb";
import { IconArrowLeft } from "@tabler/icons-react";

export default async function CastPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tvId = Number(id);

  if (isNaN(tvId)) notFound();

  let tv, credits;
  try {
    [tv, credits] = await Promise.all([getTVShow(tvId), getTVShowCredits(tvId)]);
  } catch {
    notFound();
  }

  if (!tv) notFound();

  return (
    <>
      <Navbar />
      <main className="page-container py-4 xs:py-6 sm:py-8 md:py-10 lg:py-12">
        <Link
          href={`/series/${tvId}`}
          className="h-8 xs:h-9 sm:h-10 inline-flex items-center gap-1.5 xs:gap-2 text-xs xs:text-sm text-foreground-secondary hover:text-white transition-colors mb-4 xs:mb-5 sm:mb-6 md:mb-8"
        >
          <IconArrowLeft className="w-3.5 h-3.5 xs:w-4 xs:h-4" stroke={2} />
          Back to {tv.name}
        </Link>

        <h1 className="text-xl xs:text-2xl md:text-3xl font-extrabold mb-1 xs:mb-1.5 sm:mb-2">{tv.name}</h1>
        <p className="text-foreground-secondary mb-6 xs:mb-8 sm:mb-10">Full Cast & Crew</p>

        {credits.cast.length > 0 && (
          <section>
            <h2 className="text-base xs:text-lg font-semibold mb-4 xs:mb-5 sm:mb-6">Cast ({credits.cast.length})</h2>
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 xs:gap-4 sm:gap-5">
              {credits.cast.map((member) => (
                <Link
                  key={member.id}
                  href={`/person/${member.id}`}
                  className="bento-card overflow-hidden group"
                >
                  <div className="relative w-full aspect-[3/4]">
                    <Image
                      src={
                        member.profile_path
                          ? posterUrl(member.profile_path, "w342")
                          : "https://placehold.co/342x513/0a0a0a/71717a?text=?"
                      }
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium truncate group-hover:text-accent transition-colors">{member.name}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {member.character}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
