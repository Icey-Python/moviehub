"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { useWatchlist, type WatchlistItem } from "@/app/hooks/useWatchlist";
import { IconBookmarkOff, IconArrowRight } from "@tabler/icons-react";

function getInitialItems(getAll: () => WatchlistItem[]): WatchlistItem[] {
  if (typeof window === "undefined") return [];
  return getAll();
}

export default function WatchlistPage() {
  const { getAll } = useWatchlist();
  const [items, setItems] = useState<WatchlistItem[]>(() => getInitialItems(getAll));

  useEffect(() => {
    const handleStorage = () => setItems(getAll());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [getAll]);

  return (
    <>
      <Navbar />
      <main className="page-container py-4 xs:py-6 sm:py-8 md:py-10 lg:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-6 sm:mb-8">
          My Watchlist
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <IconBookmarkOff className="w-16 h-16 text-muted-foreground mb-4" stroke={1} />
            <h2 className="text-xl font-semibold mb-2">Your watchlist is empty</h2>
            <p className="text-foreground-secondary mb-6">
              Add movies, TV shows, and anime to your watchlist to watch later.
            </p>
            <Link href="/" className="btn-primary rounded-xl">
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
            {items.map((item) => {
              const href =
                item.type === "anime"
                  ? `/anime/${item.id}`
                  : item.type === "tv"
                  ? `/series/${item.id}`
                  : `/movie/${item.id}`;

              return (
                <Link
                  key={`${item.type}-${item.id}`}
                  href={href}
                  className="group block"
                >
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-background-elevated border border-border/50 transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-lg group-hover:shadow-accent/10">
                    <Image
                      src={item.poster || "https://placehold.co/500x750/0a0a0a/71717a?text=No+Image"}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 160px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-white capitalize">
                        {item.type === "tv" ? "TV" : item.type}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                        <IconArrowRight className="w-4 h-4 text-white" stroke={2} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 px-0.5">
                    <h3 className="font-semibold text-xs sm:text-sm truncate text-card-foreground group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
