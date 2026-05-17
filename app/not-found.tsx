import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { IconHome, IconSearch } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="relative">
          <h1 className="text-8xl sm:text-9xl font-extrabold text-accent">404</h1>
          <div className="absolute inset-0 blur-3xl bg-accent/20 -z-10 rounded-full" />
        </div>
        <p className="text-xl sm:text-2xl font-semibold mt-4">Page Not Found</p>
        <p className="text-foreground-secondary mt-2 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-3 mt-8">
          <Link
            href="/"
            className="btn-primary rounded-xl"
          >
            <IconHome className="w-5 h-5" stroke={1.5} />
            Go Home
          </Link>
          <Link
            href="/#search"
            className="btn-secondary rounded-xl"
          >
            <IconSearch className="w-5 h-5" stroke={1.5} />
            Search
          </Link>
        </div>
      </main>
    </>
  );
}
