"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconMovie, IconBookmark, IconHeart } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import SearchBar from "./SearchBar";
import { useWatchlist } from "@/app/hooks/useWatchlist";
import { useFavourites } from "@/app/hooks/useFavourites";

export default function Navbar() {
  const { getAll: getWatchlist } = useWatchlist();
  const { getAll: getFavourites } = useFavourites();

  const [watchlistCount, setWatchlistCount] = useState(0);
  const [favouritesCount, setFavouritesCount] = useState(0);

  const updateCounts = () => {
    setWatchlistCount(getWatchlist().length);
    setFavouritesCount(getFavourites().length);
  };

  useEffect(() => {
    updateCounts();

    const handleWatchlistChange = () => setWatchlistCount(getWatchlist().length);
    const handleFavouritesChange = () => setFavouritesCount(getFavourites().length);

    window.addEventListener("moviehub_watchlist_change", handleWatchlistChange);
    window.addEventListener("moviehub_favourites_change", handleFavouritesChange);
    window.addEventListener("storage", updateCounts);

    return () => {
      window.removeEventListener("moviehub_watchlist_change", handleWatchlistChange);
      window.removeEventListener("moviehub_favourites_change", handleFavouritesChange);
      window.removeEventListener("storage", updateCounts);
    };
  }, [getWatchlist, getFavourites]);

  return (
    <div className="sticky top-0 z-50 w-full flex justify-center pt-2 sm:pt-3 md:pt-4 px-3 sm:px-4">
      <header className="w-full max-w-6xl h-12 sm:h-14 md:h-16 flex items-center justify-between gap-2 sm:gap-3 md:gap-4 rounded-xl sm:rounded-2xl border border-white/15 bg-zinc-900/35 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] px-3 sm:px-4 md:px-6 transition-all duration-300">
        <Link href="/" className="flex items-center gap-2 shrink-0 group" aria-label="MovieHub Home">
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shadow-md shadow-accent/30"
          >
            <IconMovie className="w-5 h-5 text-white" stroke={2} />
          </motion.div>
          <span className="font-bold text-base sm:text-lg tracking-tight hidden sm:block">
            Movie<span className="text-accent">Hub</span>
          </span>
        </Link>

        <SearchBar />

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <Link href="/watchlist" aria-label="Watchlist" className="relative">
            <motion.div
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.08 }}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center text-foreground-secondary hover:text-white bg-white/[0.04] hover:bg-white/10 transition-all duration-150 border border-white/5 hover:border-white/15"
            >
              <IconBookmark className="w-4 h-4 sm:w-5 sm:h-5" stroke={1.5} />
            </motion.div>
            <AnimatePresence>
              {watchlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -top-1 -right-1 flex h-4.5 min-w-[18px] sm:h-5 sm:min-w-[20px] items-center justify-center rounded-full bg-zinc-950 px-1 text-[9px] sm:text-[11px] font-bold text-white border border-zinc-700/80 shadow-md shadow-black/80 pointer-events-none"
                >
                  {watchlistCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <Link href="/favourites" aria-label="Favourites" className="relative">
            <motion.div
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.08 }}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center text-foreground-secondary hover:text-white bg-white/[0.04] hover:bg-white/10 transition-all duration-150 border border-white/5 hover:border-white/15"
            >
              <IconHeart className="w-4 h-4 sm:w-5 sm:h-5" stroke={1.5} />
            </motion.div>
            <AnimatePresence>
              {favouritesCount > 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -top-1 -right-1 flex h-4.5 min-w-[18px] sm:h-5 sm:min-w-[20px] items-center justify-center rounded-full bg-zinc-950 px-1 text-[9px] sm:text-[11px] font-bold text-white border border-zinc-700/80 shadow-md shadow-black/80 pointer-events-none"
                >
                  {favouritesCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </header>
    </div>
  );
}
