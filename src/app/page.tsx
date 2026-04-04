"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Header } from "@/components/Header";
import { ImageIntake } from "@/components/ImageIntake";
import { usePWA } from "@/hooks/usePWA";

export default function Home() {
  const router = useRouter();
  const { isInstalled, isIOS } = usePWA();

  const handleImageSelected = useCallback(
    (file: File) => {
      if (typeof window !== "undefined") {
        (window as unknown as Record<string, File>).__artalyse_image = file;
      }
      router.push("/analyze");
    },
    [router]
  );

  return (
    <div className="flex flex-col min-h-full">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-2xl mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Analyze Any Artwork
          </h1>
          <p className="text-lg text-muted max-w-md mx-auto">
            Upload or paste artwork to discover the techniques used and learn how
            to recreate them.
          </p>
        </div>

        <ImageIntake onImageSelected={handleImageSelected} />

        {!isInstalled && (
          <div className="mt-8 text-center text-sm text-muted max-w-sm">
            {isIOS ? (
              <>
                <p className="mb-1 font-medium text-foreground/70">
                  Save to Home Screen
                </p>
                <p>
                  Tap the share button in Safari, then &quot;Add to Home Screen&quot; to
                  use Artalyse as an app. Copy images from Behance and paste
                  them here to analyze.
                </p>
              </>
            ) : (
              <>
                <p className="mb-1 font-medium text-foreground/70">
                  Install for Share Integration
                </p>
                <p>
                  Install Artalyse to your home screen to share artwork directly
                  from apps like Behance, Instagram, and Pinterest.
                </p>
              </>
            )}
          </div>
        )}

        {/* Feature highlights */}
        <div className="grid grid-cols-3 gap-4 mt-12 w-full max-w-lg">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center mx-auto mb-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-accent-light"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <p className="text-xs text-muted">Identify Techniques</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center mx-auto mb-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-accent-light"
              >
                <path d="M12 20h9" />
                <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
              </svg>
            </div>
            <p className="text-xs text-muted">Recreation Guide</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center mx-auto mb-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-accent-light"
              >
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M4 14h16" />
                <path d="M14 4v16" />
              </svg>
            </div>
            <p className="text-xs text-muted">App-Specific Tips</p>
          </div>
        </div>
      </main>
    </div>
  );
}
