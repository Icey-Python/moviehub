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
    <div className="relative w-full max-w-[120px] xs:max-w-[180px] sm:max-w-xs md:max-w-sm">
      <IconSearch className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground pointer-events-none" stroke={2} />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full h-8 sm:h-9 md:h-10 rounded-md sm:rounded-lg border border-glass-border bg-white/[0.04] backdrop-blur-sm pl-8 sm:pl-9 pr-8 sm:pr-10 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors"
      />
      <kbd className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center gap-0.5 rounded-lg border border-glass-border bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
        <IconSlash className="w-3 h-3" stroke={2} />
      </kbd>
    </div>
  );
}
