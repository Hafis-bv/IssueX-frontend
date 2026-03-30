"use client";

import Link from "next/link";

import { Container } from "@/components/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <Container className="flex flex-col items-center justify-center text-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="text-6xl font-bold leading-none text-zinc-100">
            Error
          </div>
          <div className="text-xl font-semibold text-white">
            Something went wrong
          </div>
          <div className="text-sm text-zinc-400 max-w-md">
            {error?.message || "Please try again later."}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center cursor-pointer justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition"
          >
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-[#1a1d24] px-5 py-2.5 text-sm font-semibold text-zinc-200 hover:bg-[#0b101b] transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </Container>
    </div>
  );
}
