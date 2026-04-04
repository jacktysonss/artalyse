"use client";

import Link from "next/link";
import { usePWA } from "@/hooks/usePWA";

export function Header() {
  const { canInstall, isInstalled, install } = usePWA();

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-purple-400 flex items-center justify-center">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <span className="text-lg font-semibold tracking-tight">Artalyse</span>
      </Link>

      {canInstall && !isInstalled && (
        <button
          onClick={install}
          className="text-sm px-3 py-1.5 rounded-full bg-accent/20 text-accent-light hover:bg-accent/30 transition-colors"
        >
          Install App
        </button>
      )}
    </header>
  );
}
