"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/lib/types";
import { TechniqueChip } from "./TechniqueChip";

interface AnalysisCardProps {
  result: AnalysisResult;
}

export function AnalysisCard({ result }: AnalysisCardProps) {
  const [expandedTechnique, setExpandedTechnique] = useState<string | null>(
    null
  );

  return (
    <div className="space-y-6">
      {/* Medium & Style */}
      <div className="flex gap-3">
        <div className="flex-1 rounded-xl bg-surface p-4 border border-border">
          <p className="text-xs text-muted uppercase tracking-wider mb-1">
            Medium
          </p>
          <p className="font-medium">{result.medium}</p>
        </div>
        <div className="flex-1 rounded-xl bg-surface p-4 border border-border">
          <p className="text-xs text-muted uppercase tracking-wider mb-1">
            Style
          </p>
          <p className="font-medium">{result.style}</p>
        </div>
      </div>

      {/* Color Palette */}
      <div>
        <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-3">
          Color Palette
        </h3>
        <div className="flex gap-2">
          {result.colorPalette.map((color, i) => (
            <button
              key={i}
              className="group flex flex-col items-center gap-1"
              onClick={() => navigator.clipboard?.writeText(color)}
              title={`Copy ${color}`}
            >
              <div
                className="w-12 h-12 rounded-lg border border-border shadow-lg group-hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
              <span className="text-[10px] text-muted font-mono">
                {color}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Techniques */}
      <div>
        <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-3">
          Techniques Identified
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {result.techniques.map((technique) => (
            <TechniqueChip
              key={technique.name}
              technique={technique}
              isExpanded={expandedTechnique === technique.name}
              onClick={() =>
                setExpandedTechnique(
                  expandedTechnique === technique.name
                    ? null
                    : technique.name
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
