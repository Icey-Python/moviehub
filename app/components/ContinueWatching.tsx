"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconPlayerPlay } from "@tabler/icons-react";

interface WatchProgress {
  id: number;
  type: "movie" | "tv" | "anime";
  title: string;
  poster: string;
  season?: number;
  episode?: number;
  episodeTitle?: string;
  progress: number;
  updatedAt: number;
}

export default function ContinueWatching() {
  const [progress, setProgress] = useState<WatchProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("moviehub_watch_progress") || "[]");
      setProgress(stored);
    } catch {
      setProgress([]);
    }
    setLoading(false);
  }, []);

  if (loading || progress.length === 0) return null;

  // Get unique items by id + type (keep latest)
  const uniqueMap = new Map<string, WatchProgress>();
  progress.forEach((item) => {
    const key = `${item.type}-${item.id}`;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, item);
    }
  });
  const uniqueItems = Array.from(uniqueMap.values()).slice(0, 3);

  return (
    <section>
      <h2 className="text-lg sm:text-xl font-bold tracking-tight mb-4 sm:mb-6">
        Continue Watching
      </h2>
      <div className="flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
        {uniqueItems.map((item) => {
          const href =
            item.type === "movie"
              ? `/movie/${item.id}/watch`
              : item.type === "tv"
              ? `/series/${item.id}/watch?season=${item.season ?? 1}&ep=${item.episode ?? 1}`
              : `/anime/${item.id}/watch?ep=${item.episode ?? 1}`;

          const detailHref =
            item.type === "movie"
              ? `/movie/${item.id}`
              : item.type === "tv"
              ? `/series/${item.id}`
              : `/anime/${item.id}`;

          return (
            <Link
              key={`${item.type}-${item.id}`}
              href={href}
              className="group block shrink-0 w-[140px] sm:w-[180px] md:w-[200px] snap-start"
            >
              <div className="relative aspect-[2/3] rounded-lg sm:rounded-xl overflow-hidden glass-subtle">
                <Image
                  src={
                    item.poster ||
                    "https://placehold.co/400x600/0a0a0a/71717a?text=No+Image"
                  }
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, 200px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    <IconPlayerPlay
                      className="w-6 h-6 text-white ml-1"
                      fill="currentColor"
                      stroke={1.5}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2 sm:mt-3 px-0.5">
                <h3 className="font-semibold text-xs sm:text-sm truncate text-card-foreground">
                  {item.title}
                </h3>
                {item.episodeTitle && (
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                    {item.episodeTitle}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
