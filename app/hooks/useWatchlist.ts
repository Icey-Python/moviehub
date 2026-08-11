"use client";

import { useCallback } from "react";

export interface WatchlistItem {
  id: number;
  type: "movie" | "tv" | "anime";
  title: string;
  poster: string;
  addedAt: number;
}

const STORAGE_KEY = "moviehub_watchlist";

function getStored(): WatchlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function setStored(data: WatchlistItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
}

export function useWatchlist() {
  const isInWatchlist = useCallback((id: number, type: string) => {
    return getStored().some((item) => item.id === id && item.type === type);
  }, []);

  const toggle = useCallback((item: Omit<WatchlistItem, "addedAt">) => {
    const stored = getStored();
    const exists = stored.some(
      (i) => i.id === item.id && i.type === item.type
    );
    let updated: WatchlistItem[];
    if (exists) {
      updated = stored.filter(
        (i) => !(i.id === item.id && i.type === item.type)
      );
    } else {
      updated = [{ ...item, addedAt: Date.now() }, ...stored];
    }
    setStored(updated);
  }, []);

  const remove = useCallback((id: number, type: string) => {
    const stored = getStored();
    const updated = stored.filter((i) => !(i.id === id && i.type === type));
    setStored(updated);
  }, []);

  const getAll = useCallback(() => getStored(), []);

  return { isInWatchlist, toggle, remove, getAll };
}
