import Link from "next/link";
import { IconMovie } from "@tabler/icons-react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-glass-border bg-black/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-accent flex items-center justify-center">
            <IconMovie className="w-4 sm:w-5 h-4 sm:h-5 text-white" stroke={2} />
          </div>
          <span className="font-bold text-base sm:text-lg tracking-tight hidden sm:block">MovieHub</span>
        </Link>
        <SearchBar />
      </div>
    </header>
  );
}
