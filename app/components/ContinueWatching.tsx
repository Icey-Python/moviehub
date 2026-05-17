"use client";

import { useState } from "react";
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
  const [progress] = useState<WatchProgress[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("moviehub_watch_progress") || "[]");
    } catch {
      return [];
    }
  });

  if (progress.length === 0) return null;

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
      <h2 className="section-heading">Continue Watching</h2>
      <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-5">
        {uniqueItems.map((item) => {
          const href =
            item.type === "movie"
              ? `/movie/${item.id}/watch`
              : item.type === "tv"
              ? `/series/${item.id}/watch?season=${item.season ?? 1}&ep=${item.episode ?? 1}`
              : `/anime/${item.id}/watch?ep=${item.episode ?? 1}`;

          return (
            <Link
              key={`${item.type}-${item.id}`}
              href={href}
              className="group block shrink-0 w-[calc(50%-1.5rem)] sm:w-[calc(33.333%-1rem)] md:w-[150px] lg:w-[170px]"
              aria-label={`Continue watching ${item.title}`}
            >
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-background-elevated border border-border/50 transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-lg group-hover:shadow-accent/10">
                <Image
                  src={
                    item.poster ||
                    "https://placehold.co/400x600/0a0a0a/71717a?text=No+Image"
                  }
                  alt={item.title}
                  fill
                  sizes="120px sm:140px md:160px lg:180px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <IconPlayerPlay
                      className="w-6 h-6 text-white ml-0.5"
                      fill="currentColor"
                      stroke={1.5}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2 px-0.5">
                <h3 className="font-semibold text-xs sm:text-sm truncate text-card-foreground group-hover:text-accent transition-colors">
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
