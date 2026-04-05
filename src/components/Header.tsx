"use client";

import { useState } from "react";
import Link from "next/link";
import { usePWA } from "@/hooks/usePWA";

export function Header() {
  const { canInstall, isInstalled, isIOS, install } = usePWA();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  return (
    <>
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

        <div className="flex items-center gap-3">
          <Link
            href="/saved"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Saved
          </Link>

        {!isInstalled && canInstall && (
          <button
            onClick={install}
            className="text-sm px-3 py-1.5 rounded-full bg-accent/20 text-accent-light hover:bg-accent/30 transition-colors"
          >
            Install App
          </button>
        )}

        {!isInstalled && isIOS && !canInstall && (
          <button
            onClick={() => setShowIOSGuide(true)}
            className="text-sm px-3 py-1.5 rounded-full bg-accent/20 text-accent-light hover:bg-accent/30 transition-colors"
          >
            Add to Home Screen
          </button>
        )}
        </div>
      </header>

      {/* iOS install guide modal */}
      {showIOSGuide && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowIOSGuide(false)}
        >
          <div
            className="bg-surface border border-border rounded-t-2xl sm:rounded-2xl p-6 max-w-sm w-full mx-4 mb-0 sm:mb-0"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">
              Install Artalyse on iPhone
            </h3>
            <ol className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent-light flex items-center justify-center text-xs font-semibold">
                  1
                </span>
                <span>
                  Tap the{" "}
                  <span className="inline-flex items-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="inline text-accent-light"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                  </span>{" "}
                  <strong>Share</strong> button in Safari&apos;s toolbar
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent-light flex items-center justify-center text-xs font-semibold">
                  2
                </span>
                <span>
                  Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent-light flex items-center justify-center text-xs font-semibold">
                  3
                </span>
                <span>
                  Tap <strong>&quot;Add&quot;</strong> to confirm
                </span>
              </li>
            </ol>
            <p className="text-xs text-muted mt-4">
              Note: On iPhone, share-to-app isn&apos;t supported. Copy images from
              Behance and paste them here instead.
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full mt-4 py-2.5 rounded-xl bg-accent/20 text-accent-light font-medium hover:bg-accent/30 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
