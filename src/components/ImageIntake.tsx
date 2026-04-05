"use client";

import { useRef, useEffect, useCallback } from "react";
import { useImageIntake } from "@/hooks/useImageIntake";

interface ImageIntakeProps {
  onImageSelected: (file: File) => void;
}

export function ImageIntake({ onImageSelected }: ImageIntakeProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onImageSelectedRef = useRef(onImageSelected);
  onImageSelectedRef.current = onImageSelected;

  const {
    image,
    isDragging,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop: hookOnDrop,
    onFileSelect: hookOnFileSelect,
  } = useImageIntake();

  // When the hook's image changes (e.g. from paste), forward it
  useEffect(() => {
    if (image) {
      onImageSelectedRef.current(image);
    }
  }, [image]);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      hookOnDrop(e);
      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith("image/")) {
        onImageSelected(file);
      }
    },
    [hookOnDrop, onImageSelected]
  );

  const onFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      hookOnFileSelect(e);
      const file = e.target.files?.[0];
      if (file) {
        onImageSelected(file);
      }
    },
    [hookOnFileSelect, onImageSelected]
  );

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
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileSelect}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-6 p-8">
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
            Drop artwork here, or tap to choose a photo
          </p>
          <p className="text-sm text-muted">
            You can also copy an image and paste it here
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
