"use client";

import { useCallback } from "react";

export interface FavouriteItem {
  id: number;
  type: "movie" | "tv" | "anime";
  title: string;
  poster: string;
  addedAt: number;
}

const STORAGE_KEY = "moviehub_favourites";

function getStored(): FavouriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function setStored(data: FavouriteItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
}

export function useFavourites() {
  const isFavourite = useCallback((id: number, type: string) => {
    return getStored().some((item) => item.id === id && item.type === type);
  }, []);

  const toggle = useCallback((item: Omit<FavouriteItem, "addedAt">) => {
    const stored = getStored();
    const exists = stored.some(
      (i) => i.id === item.id && i.type === item.type
    );
    let updated: FavouriteItem[];
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

  return { isFavourite, toggle, remove, getAll };
}
