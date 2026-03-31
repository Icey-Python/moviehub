import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
            <svg className="w-4 h-4 text-accent-foreground" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">MovieHub</span>
        </Link>
        <SearchBar />
      </div>
    </header>
  );
}
