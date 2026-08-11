"use client";

import { useState, useCallback } from "react";
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
      <button
        onClick={handleWatchlist}
        className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors duration-200 ${
          inWatchlist ? "text-accent hover:text-accent-hover" : "text-foreground-secondary hover:text-white"
        }`}
        aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      >
        {inWatchlist ? (
          <IconBookmarkFilled className="w-5 h-5" fill="currentColor" stroke={1.5} />
        ) : (
          <IconBookmark className="w-5 h-5" stroke={1.5} />
        )}
      </button>
      <button
        onClick={handleFavourite}
        className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors duration-200 ${
          isFav ? "text-accent hover:text-accent-hover" : "text-foreground-secondary hover:text-white"
        }`}
        aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
      >
        {isFav ? (
          <IconHeartFilled className="w-5 h-5" fill="currentColor" stroke={1.5} />
        ) : (
          <IconHeart className="w-5 h-5" stroke={1.5} />
        )}
      </button>
    </>
  );
}
