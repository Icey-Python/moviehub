import Link from "next/link";
import { IconMovie } from "@tabler/icons-react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-glass-border bg-black/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-2 sm:px-3 md:px-4 lg:px-6 h-10 sm:h-12 md:h-14 flex items-center justify-between gap-1.5 sm:gap-2">
        <Link href="/" className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-accent flex items-center justify-center">
            <IconMovie className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white" stroke={2} />
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-tight hidden sm:block">MovieHub</span>
        </Link>
        <SearchBar />
      </div>
    </header>
  );
}
