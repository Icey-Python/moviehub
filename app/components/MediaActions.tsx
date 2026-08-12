"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { IconBookmark, IconBookmarkFilled, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useWatchlist } from "@/app/hooks/useWatchlist";
import { useFavourites } from "@/app/hooks/useFavourites";

interface MediaActionsProps {
  id: number;
  type: "movie" | "tv" | "anime";
  title: string;
  poster: string;
}

export default function MediaActions({ id, type, title, poster }: MediaActionsProps) {
  const { isInWatchlist, toggle: toggleWatchlist } = useWatchlist();
  const { isFavourite, toggle: toggleFavourite } = useFavourites();

  const [inWatchlist, setInWatchlist] = useState(() => isInWatchlist(id, type));
  const [isFav, setIsFav] = useState(() => isFavourite(id, type));

  const handleWatchlist = useCallback(() => {
    toggleWatchlist({ id, type, title, poster });
    setInWatchlist((prev) => !prev);
  }, [id, type, title, poster, toggleWatchlist]);

  const handleFavourite = useCallback(() => {
    toggleFavourite({ id, type, title, poster });
    setIsFav((prev) => !prev);
  }, [id, type, title, poster, toggleFavourite]);

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.75 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onClick={handleWatchlist}
        className={`h-12 w-12 rounded-xl flex items-center justify-center border transition-colors duration-200 ${
          inWatchlist
            ? "bg-accent/15 text-accent border-accent/40 shadow-sm shadow-accent/20"
            : "bg-white/[0.05] text-foreground-secondary hover:text-white border-white/10 hover:border-white/20"
        }`}
        aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      >
        <motion.div
          key={inWatchlist ? "saved" : "unsaved"}
          initial={{ scale: 0.5, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          {inWatchlist ? (
            <IconBookmarkFilled className="w-5 h-5 text-accent" fill="currentColor" stroke={1.5} />
          ) : (
            <IconBookmark className="w-5 h-5" stroke={1.5} />
          )}
        </motion.div>
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.75 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onClick={handleFavourite}
        className={`h-12 w-12 rounded-xl flex items-center justify-center border transition-colors duration-200 ${
          isFav
            ? "bg-rose-500/15 text-rose-500 border-rose-500/40 shadow-sm shadow-rose-500/20"
            : "bg-white/[0.05] text-foreground-secondary hover:text-white border-white/10 hover:border-white/20"
        }`}
        aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
      >
        <motion.div
          key={isFav ? "liked" : "unliked"}
          initial={{ scale: 0.5, rotate: 15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          {isFav ? (
            <IconHeartFilled className="w-5 h-5 text-rose-500" fill="currentColor" stroke={1.5} />
          ) : (
            <IconHeart className="w-5 h-5" stroke={1.5} />
          )}
        </motion.div>
      </motion.button>
    </>
  );
}
