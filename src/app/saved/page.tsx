"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { getAllSaved, deleteSaved } from "@/lib/storage";
import type { SavedAnalysis } from "@/lib/types";

export default function SavedPage() {
  const router = useRouter();
  const [items, setItems] = useState<SavedAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    getAllSaved()
      .then((saved) => {
        setItems(saved);
        // Create object URLs for thumbnails
        const urls: Record<string, string> = {};
        for (const item of saved) {
          urls[item.id] = URL.createObjectURL(item.imageBlob);
        }
        setThumbnails(urls);
      })
      .finally(() => setLoading(false));

    return () => {
      // Revoke all object URLs on unmount
      Object.values(thumbnails).forEach(URL.revokeObjectURL);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteSaved(id);
      if (thumbnails[id]) URL.revokeObjectURL(thumbnails[id]);
      setItems((prev) => prev.filter((item) => item.id !== id));
      setThumbnails((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      setConfirmDelete(null);
    },
    [thumbnails]
  );

  const handleOpen = useCallback(
    (id: string) => {
      router.push(`/analyze?saved=${id}`);
    },
    [router]
  );

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col min-h-full">
      <Header />

      <main className="flex-1 px-4 py-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Saved Analyses</h1>
          <span className="text-sm text-muted">
            {items.length} {items.length === 1 ? "piece" : "pieces"}
          </span>
        </div>

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square rounded-xl shimmer" />
            ))}
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-surface-light flex items-center justify-center mb-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-muted"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
            </div>
            <p className="text-muted text-lg mb-1">No saved analyses yet</p>
            <p className="text-sm text-muted/70 mb-4">
              Analyze an artwork and tap Save to keep it here
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/80 transition-colors"
            >
              Analyze Artwork
            </button>
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-xl border border-border overflow-hidden bg-surface hover:border-muted transition-colors"
              >
                {/* Thumbnail */}
                <button
                  onClick={() => handleOpen(item.id)}
                  className="w-full aspect-square bg-black"
                >
                  {thumbnails[item.id] && (
                    <img
                      src={thumbnails[item.id]}
                      alt={`${item.analysis.medium} - ${item.analysis.style}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>

                {/* Info overlay */}
                <div className="p-3">
                  <p className="text-sm font-medium truncate">
                    {item.analysis.medium}
                  </p>
                  <p className="text-xs text-muted truncate">
                    {item.analysis.style}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[10px] text-muted/70">
                      {formatDate(item.savedAt)}
                    </p>
                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDelete(item.id);
                      }}
                      className="p-1 rounded hover:bg-red-500/20 text-muted hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>

                  {/* Color swatches */}
                  <div className="flex gap-1 mt-2">
                    {item.analysis.colorPalette.slice(0, 6).map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-sm border border-border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setConfirmDelete(null)}
        >
          <div
            className="bg-surface border border-border rounded-2xl p-6 max-w-xs w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-2">Delete Analysis?</h3>
            <p className="text-sm text-muted mb-4">
              This will permanently remove this saved artwork and its analysis.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-surface-light transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 py-2.5 rounded-xl bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
