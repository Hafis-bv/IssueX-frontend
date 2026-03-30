import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <Container className="flex flex-col items-center justify-center text-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="text-6xl font-bold leading-none text-zinc-100">404</div>
          <div className="text-xl font-semibold text-white">
            Page not found
          </div>
          <div className="text-sm text-zinc-400 max-w-md">
            The link may be broken, or the page may have been moved.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-xl border border-[#1a1d24] px-5 py-2.5 text-sm font-semibold text-zinc-200 hover:bg-[#0b101b] transition"
          >
            View Projects
          </Link>
        </div>
      </Container>
    </div>
  );
}

