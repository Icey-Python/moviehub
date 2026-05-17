"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { IconSearch, IconSlash } from "@tabler/icons-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) return;
    debounceRef.current = setTimeout(() => {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, router]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
        setQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative w-full max-w-[120px] xs:max-w-[180px] sm:max-w-xs md:max-w-md lg:max-w-lg">
      <IconSearch className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground pointer-events-none" stroke={2} />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full h-9 sm:h-10 md:h-11 rounded-lg sm:rounded-xl border border-border bg-card/50 backdrop-blur-sm pl-9 sm:pl-10 pr-8 sm:pr-10 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
        aria-label="Search"
      />
      <kbd className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 hidden lg:inline-flex items-center gap-0.5 rounded-lg border border-border bg-card/50 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-mono text-muted-foreground">
        <IconSlash className="w-2.5 h-2.5 sm:w-3 sm:h-3" stroke={2} />
      </kbd>
    </div>
  );
}
