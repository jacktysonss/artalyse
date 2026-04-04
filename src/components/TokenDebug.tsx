"use client";

import { useState } from "react";
import type { TokenUsage } from "@/lib/types";

// Pricing per million tokens (as of 2025 for Claude Sonnet)
const PRICING: Record<string, { input: number; output: number }> = {
  "claude-sonnet-4-20250514": { input: 3.0, output: 15.0 },
};
const DEFAULT_PRICING = { input: 3.0, output: 15.0 };

interface TokenDebugProps {
  usage: TokenUsage;
}

export function TokenDebug({ usage }: TokenDebugProps) {
  const [isOpen, setIsOpen] = useState(false);

  const pricing = PRICING[usage.model] ?? DEFAULT_PRICING;
  const inputCost = (usage.inputTokens / 1_000_000) * pricing.input;
  const outputCost = (usage.outputTokens / 1_000_000) * pricing.output;
  const totalCost = inputCost + outputCost;

  const formatCost = (cost: number) => {
    if (cost < 0.01) return `$${cost.toFixed(4)}`;
    return `$${cost.toFixed(3)}`;
  };

  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 text-xs text-muted hover:text-foreground/70 transition-colors"
      >
        <span className="flex items-center gap-2">
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
            <path d="M12 20h9" />
            <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
          </svg>
          Debug: Token Usage
        </span>
        <span className="font-mono">
          {formatCost(totalCost)} est.
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-border p-3 space-y-2">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
            <span className="text-muted">Model</span>
            <span className="font-mono text-right">{usage.model}</span>

            <span className="text-muted">Input tokens</span>
            <span className="font-mono text-right">
              {usage.inputTokens.toLocaleString()}
            </span>

            <span className="text-muted">Output tokens</span>
            <span className="font-mono text-right">
              {usage.outputTokens.toLocaleString()}
            </span>

            <span className="text-muted">Total tokens</span>
            <span className="font-mono text-right">
              {(usage.inputTokens + usage.outputTokens).toLocaleString()}
            </span>

            <div className="col-span-2 border-t border-border my-1" />

            <span className="text-muted">Input cost</span>
            <span className="font-mono text-right">
              {formatCost(inputCost)}{" "}
              <span className="text-muted">
                (${pricing.input}/M)
              </span>
            </span>

            <span className="text-muted">Output cost</span>
            <span className="font-mono text-right">
              {formatCost(outputCost)}{" "}
              <span className="text-muted">
                (${pricing.output}/M)
              </span>
            </span>

            <span className="text-muted font-medium">Estimated total</span>
            <span className="font-mono text-right font-medium">
              {formatCost(totalCost)}
            </span>
          </div>

          <p className="text-[10px] text-muted/60 mt-2">
            Cost estimate based on published API pricing. Actual cost may vary
            with caching and batching discounts.
          </p>
        </div>
      )}
    </div>
  );
}
