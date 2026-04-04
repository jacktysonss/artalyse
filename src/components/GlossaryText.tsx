"use client";

import { useState, useRef, useEffect } from "react";
import { annotateText, getGlossaryEntry } from "@/lib/glossary";

interface GlossaryTextProps {
  text: string;
  className?: string;
}

export function GlossaryText({ text, className = "" }: GlossaryTextProps) {
  const segments = annotateText(text);

  return (
    <span className={className}>
      {segments.map((seg, i) =>
        seg.glossaryKey ? (
          <GlossaryTerm key={i} text={seg.text} glossaryKey={seg.glossaryKey} />
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </span>
  );
}

function GlossaryTerm({
  text,
  glossaryKey,
}: {
  text: string;
  glossaryKey: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const entry = getGlossaryEntry(glossaryKey);

  // Close on outside click
  useEffect(() => {
    if (!showTooltip) return;
    const handler = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler as EventListener);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler as EventListener);
    };
  }, [showTooltip]);

  if (!entry) return <span>{text}</span>;

  return (
    <span className="relative inline" ref={ref}>
      <button
        className="border-b border-dotted border-accent-light/60 text-inherit hover:border-accent-light hover:text-accent-light transition-colors cursor-help"
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        type="button"
      >
        {text}
      </button>

      {showTooltip && (
        <div
          ref={tooltipRef}
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3 rounded-xl bg-surface-light border border-border shadow-xl text-left"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <p className="text-xs font-semibold text-accent-light mb-1">
            {entry.term}
          </p>
          <p className="text-xs text-foreground/80 leading-relaxed mb-1.5">
            {entry.definition}
          </p>
          {entry.location && (
            <p className="text-[11px] text-muted leading-relaxed">
              <span className="font-medium text-foreground/60">Find it: </span>
              {entry.location}
            </p>
          )}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-border" />
        </div>
      )}
    </span>
  );
}
