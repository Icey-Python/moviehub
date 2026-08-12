'use client';

import { useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import { IconAlertTriangle, IconRefresh } from '@tabler/icons-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App runtime error:', error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="page-container py-12 xs:py-16 sm:py-20 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mb-6 border border-red-500/20">
          <IconAlertTriangle className="w-8 h-8" stroke={1.5} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
          Something went wrong
        </h1>
        <p className="text-foreground-secondary max-w-md mb-8 text-sm sm:text-base">
          We encountered an issue loading this section. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="btn-primary rounded-xl flex items-center gap-2"
        >
          <IconRefresh className="w-4 h-4" stroke={2} />
          Try Again
        </button>
      </main>
    </>
  );
}
