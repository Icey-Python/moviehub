import Link from "next/link";
import { IconMovie } from "@tabler/icons-react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 w-full flex justify-center pt-3 sm:pt-4 px-3 sm:px-4">
      <header className="w-full max-w-6xl h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-border/50 bg-background-elevated/80 backdrop-blur-xl px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0 group" aria-label="MovieHub Home">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
            <IconMovie className="w-5 h-5 text-white" stroke={2} />
          </div>
          <span className="font-bold text-base sm:text-lg tracking-tight hidden sm:block">
            Movie<span className="text-accent">Hub</span>
          </span>
        </Link>
        <SearchBar />
      </header>
    </div>
  );
}
