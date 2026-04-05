"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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

type Placement = {
  vertical: "above" | "below";
  alignStyle: React.CSSProperties;
  arrowStyle: React.CSSProperties;
};

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
  const [placement, setPlacement] = useState<Placement | null>(null);
  const entry = getGlossaryEntry(glossaryKey);

  const computePlacement = useCallback(() => {
    const trigger = ref.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const pad = 8; // min distance from viewport edge
    const gap = 8; // gap between trigger and tooltip

    // Vertical: prefer above, fall back to below
    const spaceAbove = triggerRect.top;
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const vertical =
      spaceAbove >= tooltipRect.height + gap || spaceAbove >= spaceBelow
        ? "above"
        : "below";

    // Horizontal: center on the trigger, but clamp to viewport
    const triggerCenter = triggerRect.left + triggerRect.width / 2;
    const halfTooltip = tooltipRect.width / 2;

    let left = triggerCenter - halfTooltip;
    // Clamp left edge
    if (left < pad) left = pad;
    // Clamp right edge
    if (left + tooltipRect.width > window.innerWidth - pad) {
      left = window.innerWidth - pad - tooltipRect.width;
    }

    // Convert to relative position from trigger
    const offsetLeft = left - triggerRect.left;

    // Arrow should point at the trigger center
    const arrowLeft = triggerCenter - left;

    const alignStyle: React.CSSProperties = {
      left: `${offsetLeft}px`,
      ...(vertical === "above"
        ? { bottom: `${triggerRect.height + gap}px` }
        : { top: `${triggerRect.height + gap}px` }),
    };

    const arrowStyle: React.CSSProperties = {
      left: `${arrowLeft}px`,
    };

    setPlacement({ vertical, alignStyle, arrowStyle });
  }, []);

  // Recompute position when tooltip becomes visible
  useEffect(() => {
    if (!showTooltip) {
      setPlacement(null);
      return;
    }
    // Use requestAnimationFrame so the tooltip is rendered (invisible) first
    const id = requestAnimationFrame(computePlacement);
    return () => cancelAnimationFrame(id);
  }, [showTooltip, computePlacement]);

  // Close on outside click / touch
  useEffect(() => {
    if (!showTooltip) return;
    const handler = (e: MouseEvent | TouchEvent) => {
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
          className="absolute z-50 w-72 sm:w-80 p-3 rounded-xl bg-surface-light border border-border shadow-xl text-left"
          style={
            placement
              ? { ...placement.alignStyle, opacity: 1 }
              : { opacity: 0, top: 0, left: 0 }
          }
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
          {placement && (
            <div
              className={`absolute w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent ${
                placement.vertical === "above"
                  ? "top-full border-t-[6px] border-t-border"
                  : "bottom-full border-b-[6px] border-b-border"
              }`}
              style={{
                left: placement.arrowStyle.left,
                transform: "translateX(-50%)",
              }}
            />
          )}
        </div>
      )}
    </span>
  );
}
