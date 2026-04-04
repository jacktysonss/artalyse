"use client";

import { useState } from "react";
import type { RecreationGuide as RecreationGuideType } from "@/lib/types";

interface RecreationGuideProps {
  guide: RecreationGuideType;
}

const skillColors = {
  beginner: "text-green-400 bg-green-500/20",
  intermediate: "text-yellow-400 bg-yellow-500/20",
  advanced: "text-red-400 bg-red-500/20",
};

export function RecreationGuide({ guide }: RecreationGuideProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recreation Guide</h2>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2 py-1 rounded-full ${skillColors[guide.skillLevel]}`}
          >
            {guide.skillLevel}
          </span>
          <span className="text-xs text-muted">{guide.estimatedTime}</span>
        </div>
      </div>

      <p className="text-sm text-muted leading-relaxed">{guide.overview}</p>

      {/* Materials */}
      {guide.materialsNeeded?.length > 0 && (
        <div className="rounded-xl bg-surface border border-border p-4">
          <h3 className="text-sm font-medium mb-2">Materials Needed</h3>
          <div className="flex flex-wrap gap-2">
            {guide.materialsNeeded.map((material, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-surface-light text-muted"
              >
                {material}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Steps */}
      <div className="space-y-2">
        {guide.steps.map((step) => (
          <div
            key={step.step}
            className="rounded-xl border border-border overflow-hidden"
          >
            <button
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-surface-light/50 transition-colors"
              onClick={() =>
                setExpandedStep(expandedStep === step.step ? null : step.step)
              }
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent-light flex items-center justify-center text-sm font-semibold">
                {step.step}
              </span>
              <span className="font-medium flex-1">{step.title}</span>
              <svg
                className={`w-4 h-4 text-muted transition-transform ${
                  expandedStep === step.step ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedStep === step.step && (
              <div className="px-4 pb-4 pl-15">
                <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
                  {step.description}
                </p>
                {step.tips.length > 0 && (
                  <div className="space-y-1">
                    {step.tips.map((tip, i) => (
                      <div key={i} className="flex gap-2 text-sm text-muted">
                        <span className="text-accent-light mt-0.5">*</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
