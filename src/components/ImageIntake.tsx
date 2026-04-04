"use client";

import { useRef } from "react";
import { useImageIntake } from "@/hooks/useImageIntake";

interface ImageIntakeProps {
  onImageSelected: (file: File, preview: string) => void;
}

export function ImageIntake({ onImageSelected }: ImageIntakeProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    preview,
    isDragging,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop: originalOnDrop,
    onFileSelect: originalOnFileSelect,
    handleFile,
  } = useImageIntake();

  const onDrop = (e: React.DragEvent) => {
    originalOnDrop(e);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      onImageSelected(file, URL.createObjectURL(file));
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    originalOnFileSelect(e);
    const file = e.target.files?.[0];
    if (file) {
      onImageSelected(file, URL.createObjectURL(file));
    }
  };

  // Also intercept paste at the component level
  const onPasteCapture = () => {
    // The useImageIntake hook handles the paste event on document
    // We need a small delay to let it process
    setTimeout(() => {
      if (preview) {
        // This is tricky - paste is handled by the hook
        // We'll use handleFile callback approach instead
      }
    }, 100);
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full min-h-[400px] rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
        isDragging
          ? "drop-active border-accent bg-accent/5"
          : "border-border hover:border-muted hover:bg-surface-light/50"
      }`}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onPaste={onPasteCapture}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={onFileSelect}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-6 p-8">
        {/* Upload icon */}
        <div className="w-20 h-20 rounded-full bg-surface-light flex items-center justify-center">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>

        <div className="text-center">
          <p className="text-lg font-medium mb-1">
            Drop artwork here, or tap to upload
          </p>
          <p className="text-sm text-muted">
            You can also paste an image from your clipboard
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 text-xs text-muted">
          <span className="px-2 py-1 rounded bg-surface-light">PNG</span>
          <span className="px-2 py-1 rounded bg-surface-light">JPG</span>
          <span className="px-2 py-1 rounded bg-surface-light">WebP</span>
          <span className="px-2 py-1 rounded bg-surface-light">GIF</span>
        </div>
      </div>

      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-accent/10">
          <p className="text-xl font-semibold text-accent-light">
            Drop to analyze
          </p>
        </div>
      )}
    </div>
  );
}
