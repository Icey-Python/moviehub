import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { IconHome, IconSearch } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 xs:px-6 text-center">
        <div className="relative">
          <h1 className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-extrabold text-accent">404</h1>
          <div className="absolute inset-0 blur-3xl bg-accent/20 -z-10 rounded-full" />
        </div>
        <p className="text-lg xs:text-xl sm:text-2xl font-semibold mt-3 xs:mt-4">Page Not Found</p>
        <p className="text-foreground-secondary mt-1.5 xs:mt-2 max-w-xs xs:max-w-sm sm:max-w-md text-sm xs:text-base">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-2 xs:gap-2.5 sm:gap-3 mt-6 xs:mt-7 sm:mt-8">
          <Link href="/">
            <button className="btn-primary h-10 xs:h-11 px-4 xs:px-5 sm:px-6 text-xs xs:text-sm rounded-lg sm:rounded-xl">
              <IconHome className="w-4 h-4 xs:w-5 xs:h-5" stroke={1.5} />
              Go Home
            </button>
          </Link>
          <Link href="/#search">
            <button className="btn-secondary h-10 xs:h-11 px-4 xs:px-5 sm:px-6 text-xs xs:text-sm rounded-lg sm:rounded-xl">
              <IconSearch className="w-4 h-4 xs:w-5 xs:h-5" stroke={1.5} />
              Search
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
