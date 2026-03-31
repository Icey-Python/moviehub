import Link from "next/link";
import { IconMovie } from "@tabler/icons-react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-glass-border bg-black/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <IconMovie className="w-5 h-5 text-white" stroke={2} />
          </div>
          <span className="font-bold text-lg tracking-tight">MovieHub</span>
        </Link>
        <SearchBar />
      </div>
    </header>
  );
}
