"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

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
    <div className="relative w-full max-w-md">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full h-9 rounded-md border border-border bg-muted/50 pl-9 pr-16 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
      />
      <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
        /
      </kbd>
    </div>
  );
}
