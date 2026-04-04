"use client";

import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { AnalysisCard } from "@/components/AnalysisCard";
import { RecreationGuide } from "@/components/RecreationGuide";
import { AppAdvice } from "@/components/AppAdvice";
import { LoadingAnalysis } from "@/components/LoadingAnalysis";
import { useAnalysis } from "@/hooks/useAnalysis";
import { saveAnalysis, getSavedById } from "@/lib/storage";
import type { AnalysisResult } from "@/lib/types";

function AnalyzeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { result, isLoading, error, analyze } = useAnalysis();
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const hasStarted = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // For loaded saved analyses
  const [savedResult, setSavedResult] = useState<AnalysisResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const activeResult = savedResult || result;

  // Load image from various sources
  useEffect(() => {
    if (hasStarted.current) return;

    const loadImage = async () => {
      // From saved analysis
      const savedId = searchParams.get("saved");
      if (savedId) {
        try {
          const saved = await getSavedById(savedId);
          if (saved) {
            setImageBlob(saved.imageBlob);
            setPreview(URL.createObjectURL(saved.imageBlob));
            setSavedResult(saved.analysis);
            setIsSaved(true);
            hasStarted.current = true;
            return;
          }
        } catch (e) {
          console.error("Failed to load saved analysis:", e);
        }
      }

      const source = searchParams.get("source");

      // From share target (service worker cached)
      if (source === "share") {
        try {
          const cache = await caches.open("shared-images");
          const response = await cache.match("/shared-image-latest");
          if (response) {
            const blob = await response.blob();
            const file = new File([blob], "shared-image", {
              type: blob.type || "image/jpeg",
            });
            setImageFile(file);
            setImageBlob(blob);
            setPreview(URL.createObjectURL(blob));
            hasStarted.current = true;
            analyze(file);
            await cache.delete("/shared-image-latest");
            return;
          }
        } catch (e) {
          console.error("Failed to load shared image:", e);
        }
      }

      // From home page (window global)
      if (typeof window !== "undefined") {
        const stored = (window as unknown as Record<string, File>)
          .__artalyse_image;
        if (stored) {
          setImageFile(stored);
          setImageBlob(stored);
          setPreview(URL.createObjectURL(stored));
          hasStarted.current = true;
          analyze(stored);
          delete (window as unknown as Record<string, File>).__artalyse_image;
          return;
        }
      }
    };

    loadImage();
  }, [searchParams, analyze]);

  const handleNewImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setImageFile(file);
      setImageBlob(file);
      setPreview(URL.createObjectURL(file));
      setSavedResult(null);
      setIsSaved(false);
      hasStarted.current = true;
      analyze(file);
    },
    [analyze]
  );

  const handleSave = useCallback(async () => {
    const analysisToSave = activeResult;
    if (!analysisToSave || !imageBlob) return;

    setIsSaving(true);
    try {
      await saveAnalysis(imageBlob, analysisToSave);
      setIsSaved(true);
    } catch (e) {
      console.error("Failed to save:", e);
    } finally {
      setIsSaving(false);
    }
  }, [activeResult, imageBlob]);

  return (
    <>
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Image panel */}
        <div className="lg:w-1/2 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] bg-black flex items-center justify-center p-4">
          {preview ? (
            <img
              src={preview}
              alt="Artwork being analyzed"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          ) : (
            <div className="text-center">
              <p className="text-muted mb-4">No image loaded</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/80 transition-colors"
              >
                Upload Artwork
              </button>
              <button
                onClick={() => router.push("/")}
                className="block mx-auto mt-2 text-sm text-muted hover:text-foreground transition-colors"
              >
                Back to home
              </button>
            </div>
          )}
        </div>

        {/* Analysis panel */}
        <div className="lg:w-1/2 p-4 lg:p-8 lg:overflow-y-auto">
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
              {imageFile && (
                <button
                  onClick={() => analyze(imageFile)}
                  className="mt-2 text-sm text-red-300 underline"
                >
                  Retry analysis
                </button>
              )}
            </div>
          )}

          {isLoading && <LoadingAnalysis />}

          {activeResult && (
            <div className="space-y-8">
              {/* Save button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaved || isSaving}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isSaved
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-accent/20 text-accent-light hover:bg-accent/30 border border-accent/30"
                  }`}
                >
                  {isSaved ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Saved
                    </>
                  ) : isSaving ? (
                    "Saving..."
                  ) : (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                      </svg>
                      Save Analysis
                    </>
                  )}
                </button>
              </div>

              <AnalysisCard result={activeResult} />
              <div className="border-t border-border pt-8">
                <RecreationGuide guide={activeResult.recreationGuide} />
              </div>
              <div className="border-t border-border pt-8">
                <AppAdvice guidance={activeResult.appGuidance} />
              </div>

              <div className="border-t border-border pt-6 pb-8 text-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent/80 transition-colors"
                >
                  Analyze Another Artwork
                </button>
              </div>
            </div>
          )}

          {!isLoading && !activeResult && !error && !preview && (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <p className="text-muted text-lg mb-2">
                Share or upload an artwork to get started
              </p>
              <p className="text-sm text-muted/70">
                Paste an image, drag & drop, or use the upload button
              </p>
            </div>
          )}
        </div>
      </main>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleNewImage}
        className="hidden"
      />
    </>
  );
}

export default function AnalyzePage() {
  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <Suspense fallback={<LoadingAnalysis />}>
        <AnalyzeContent />
      </Suspense>
    </div>
  );
}
