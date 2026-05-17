"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconChevronDown,
} from "@tabler/icons-react";

type Source = "vidsrc" | "vidking";

interface SeasonInfo {
  season_number: number;
  name: string;
  episode_count: number;
}

interface PlayerProps {
  movieId: number;
  movieTitle: string;
  type: "movie" | "tv" | "anime";
  season?: number;
  episode?: number;
  seasons?: SeasonInfo[];
  poster?: string;
}

function saveWatch(item: {
  id: number;
  type: string;
  title: string;
  poster: string;
  season?: number;
  episode?: number;
  episodeTitle?: string;
}) {
  const STORAGE_KEY = "moviehub_watch_progress";
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const filtered = stored.filter(
      (p: typeof item) => !(p.id === item.id && p.type === item.type && p.season === item.season && p.episode === item.episode)
    );
    const updated = [{ ...item, progress: 0, updatedAt: Date.now() }, ...filtered].slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export default function Player({
  movieId,
  movieTitle,
  type,
  season,
  episode,
  seasons = [],
  poster = "",
}: PlayerProps) {
  const [source, setSource] = useState<Source>("vidsrc");
  const [pickerOpen, setPickerOpen] = useState(false);

  const currentSeason = season ?? 1;
  const currentEpisode = episode ?? 1;

  const activeSeason = seasons.find((s) => s.season_number === currentSeason);
  const totalEpisodes = activeSeason?.episode_count ?? 0;

  const watchBase = `/series/${movieId}/watch`;

  const episodeLinks = useMemo(() => {
    if (type !== "tv" || !seasons.length) return null;
    const prevEp =
      currentEpisode > 1
        ? `${watchBase}?season=${currentSeason}&ep=${currentEpisode - 1}`
        : currentSeason > (seasons[0]?.season_number ?? 1)
        ? (() => {
            const prevSeasonNum = [...seasons]
              .reverse()
              .find((s) => s.season_number < currentSeason)?.season_number;
            const prevSeason = seasons.find(
              (s) => s.season_number === prevSeasonNum
            );
            return prevSeasonNum
              ? `${watchBase}?season=${prevSeasonNum}&ep=${prevSeason?.episode_count ?? 1}`
              : null;
          })()
        : null;

    const nextEp =
      currentEpisode < totalEpisodes
        ? `${watchBase}?season=${currentSeason}&ep=${currentEpisode + 1}`
        : (() => {
            const nextSeasonNum = seasons.find(
              (s) => s.season_number > currentSeason
            )?.season_number;
            return nextSeasonNum
              ? `${watchBase}?season=${nextSeasonNum}&ep=1`
              : null;
          })();

    return { prev: prevEp, next: nextEp };
  }, [type, currentSeason, currentEpisode, seasons, totalEpisodes, watchBase]);

  const episodeTitle = type === "tv" 
    ? `S${currentSeason}E${currentEpisode}` 
    : type === "anime" 
      ? `Episode ${currentEpisode}` 
      : undefined;

  useEffect(() => {
    saveWatch({
      id: movieId,
      type,
      title: movieTitle,
      poster: poster,
      season: type === "tv" ? currentSeason : undefined,
      episode: episode ? currentEpisode : undefined,
      episodeTitle,
    });
  }, [type, movieId, movieTitle, poster, currentSeason, currentEpisode, episode, episodeTitle]);

  function getEmbedUrl(src: Source): string {
    if (src === "vidking") {
      const color = "e50914";
      if (type === "movie") {
        return `https://www.vidking.net/embed/movie/${movieId}?autoPlay=true&color=${color}`;
      }
      if (type === "tv" && season && episode) {
        return `https://www.vidking.net/embed/tv/${movieId}/${season}/${episode}?autoPlay=true&color=${color}&episodeSelector=true&nextEpisode=true`;
      }
      return `https://www.vidking.net/embed/tv/${movieId}/1/1?autoPlay=true&color=${color}&episodeSelector=true&nextEpisode=true`;
    }

    if (type === "anime") {
      return `https://vidsrc.me/embed/anime/${movieId}`;
    }
    if (type === "tv" && season && episode) {
      return `https://vidsrc.me/embed/tv/${movieId}/${season}/${episode}`;
    }
    return `https://vidsrc.me/embed/${type}/${movieId}`;
  }

  const embedUrl = getEmbedUrl(source);

  const sources: { id: Source; label: string }[] = [
    { id: "vidsrc", label: "VidSrc" },
    { id: "vidking", label: "VidKing" },
  ];

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      <div className="flex items-center justify-between h-12 xs:h-14 px-3 xs:px-4 sm:px-6 bg-background-elevated/90 backdrop-blur-xl border-b border-border/50 shrink-0">
        <Link
          href={
            type === "anime"
              ? `/anime/${movieId}`
              : type === "tv"
              ? `/series/${movieId}`
              : `/movie/${movieId}`
          }
          className="flex items-center gap-1.5 xs:gap-2 text-xs xs:text-sm text-foreground-secondary hover:text-white transition-colors"
          aria-label="Go back"
        >
          <IconArrowLeft className="w-4 h-4 xs:w-5 xs:h-5" stroke={2} />
          <span className="hidden xs:inline">Back</span>
        </Link>

        <span className="text-[10px] xs:text-xs text-muted-foreground truncate max-w-[120px] xs:max-w-[160px] sm:max-w-[300px]">
          {movieTitle}
          {type === "tv" && season && episode && (
            <span className="text-zinc-600"> · S{season}E{episode}</span>
          )}
        </span>

        <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
          {type === "tv" && episodeLinks && (
            <div className="flex items-center gap-0.5 xs:gap-1">
              <Link
                href={episodeLinks.prev ?? "#"}
                className={`carousel-dot w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-lg glass text-foreground-secondary hover:text-white transition-colors ${
                  !episodeLinks.prev ? "opacity-30 pointer-events-none" : ""
                }`}
                aria-label="Previous episode"
              >
                <IconPlayerSkipBack className="w-3.5 h-3.5 xs:w-4 xs:h-4" stroke={2} />
              </Link>

              <div className="relative">
                <button
                  onClick={() => setPickerOpen(!pickerOpen)}
                  className="carousel-dot flex items-center gap-0.5 xs:gap-1 h-7 xs:h-8 sm:h-9 px-1.5 xs:px-2 rounded-lg glass text-[10px] xs:text-xs text-foreground-secondary hover:text-white"
                  aria-label="Episode picker"
                  aria-expanded={pickerOpen}
                >
                  S{currentSeason}E{currentEpisode}
                  <IconChevronDown className={`w-2.5 h-2.5 xs:w-3 xs:h-3 transition-transform ${pickerOpen ? "rotate-180" : ""}`} stroke={2} />
                </button>

                {pickerOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 xs:w-64 max-h-60 xs:max-h-72 overflow-y-auto glass rounded-xl p-2 xs:p-3 z-50 border border-border/50">
                    {seasons.map((s) => (
                      <div key={s.season_number} className="mb-2 xs:mb-3 last:mb-0">
                        <p className="text-[10px] xs:text-xs font-semibold text-muted-foreground px-1.5 xs:px-2 mb-1.5 xs:mb-2">{s.name}</p>
                        <div className="grid grid-cols-6 gap-1 xs:gap-1.5">
                          {Array.from({ length: s.episode_count }, (_, i) => i + 1).map((ep) => (
                            <Link
                              key={ep}
                              href={`${watchBase}?season=${s.season_number}&ep=${ep}`}
                              onClick={() => setPickerOpen(false)}
                              className={`carousel-dot h-7 xs:h-8 text-center text-[10px] xs:text-xs rounded-lg transition-colors ${
                                s.season_number === currentSeason && ep === currentEpisode
                                  ? "bg-accent text-white"
                                  : "text-foreground-secondary hover:bg-white/10"
                              }`}
                            >
                              {ep}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href={episodeLinks.next ?? "#"}
                className={`carousel-dot w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-lg glass text-foreground-secondary hover:text-white transition-colors ${
                  !episodeLinks.next ? "opacity-30 pointer-events-none" : ""
                }`}
                aria-label="Next episode"
              >
                <IconPlayerSkipForward className="w-3.5 h-3.5 xs:w-4 xs:h-4" stroke={2} />
              </Link>
            </div>
          )}

          <div className="flex items-center gap-0.5 xs:gap-1">
            {sources.map((s) => (
              <button
                key={s.id}
                onClick={() => setSource(s.id)}
                className={`carousel-dot h-7 xs:h-8 sm:h-9 px-2 xs:px-3 rounded-lg text-[10px] xs:text-xs font-medium transition-colors ${
                  source === s.id ? "bg-accent text-white" : "glass text-foreground-secondary hover:text-white"
                }`}
                aria-label={`Switch to ${s.label}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <iframe src={embedUrl} className="flex-1 w-full h-full" key={`${source}-${currentSeason}-${currentEpisode}`} allowFullScreen title="Video player" />
    </div>
  );
}
