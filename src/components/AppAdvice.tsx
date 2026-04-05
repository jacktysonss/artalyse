"use client";

import { useState } from "react";
import type { AppGuidance } from "@/lib/types";
import { GlossaryText } from "./GlossaryText";

interface AppAdviceProps {
  guidance: {
    adobeFresco: AppGuidance;
    procreate: AppGuidance;
  };
}

const tabs = [
  { key: "adobeFresco" as const, label: "Adobe Fresco" },
  { key: "procreate" as const, label: "Procreate" },
];

export function AppAdvice({ guidance }: AppAdviceProps) {
  const [activeTab, setActiveTab] = useState<keyof typeof guidance>("adobeFresco");
  const app = guidance[activeTab];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">App-Specific Guidance</h2>
        <p className="text-xs text-muted mt-1">
          <span className="border-b border-dotted border-accent-light/60">Dotted terms</span> have
          definitions — tap or hover for details
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 p-1 rounded-xl bg-surface border border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 text-sm py-2 px-3 rounded-lg transition-all ${
              activeTab === tab.key
                ? "bg-accent/20 text-accent-light font-medium"
                : "text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Brushes */}
        <div className="rounded-xl bg-surface border border-border p-4">
          <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-2">
            Recommended Brushes
          </h3>
          <div className="flex flex-wrap gap-2">
            {app.brushes.map((brush, i) => (
              <span
                key={i}
                className="text-sm px-3 py-1.5 rounded-lg bg-surface-light border border-border"
              >
                <GlossaryText text={brush} />
              </span>
            ))}
          </div>
        </div>

        {/* Pen Settings */}
        <div className="rounded-xl bg-surface border border-border p-4">
          <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-3">
            Pen / Stylus Settings
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted mb-1">
                <GlossaryText text="Pressure" />
              </p>
              <p className="text-sm">
                <GlossaryText text={app.penSettings.pressure} />
              </p>
            </div>
            <div>
              <p className="text-xs text-muted mb-1">
                <GlossaryText text="Tilt" />
              </p>
              <p className="text-sm">
                <GlossaryText text={app.penSettings.tilt} />
              </p>
            </div>
            <div>
              <p className="text-xs text-muted mb-1">
                <GlossaryText text="Smoothing / Stabilization" />
              </p>
              <p className="text-sm">
                <GlossaryText text={app.penSettings.smoothing} />
              </p>
            </div>
          </div>
        </div>

        {/* Layer Strategy */}
        <div className="rounded-xl bg-surface border border-border p-4">
          <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-2">
            <GlossaryText text="Layer Strategy" />
          </h3>
          <p className="text-sm leading-relaxed">
            <GlossaryText text={app.layerStrategy} />
          </p>
        </div>

        {/* Blending Modes */}
        <div className="rounded-xl bg-surface border border-border p-4">
          <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-2">
            <GlossaryText text="Blending Modes" />
          </h3>
          <div className="flex flex-wrap gap-2">
            {app.blendingModes.map((mode, i) => (
              <span
                key={i}
                className="text-sm px-3 py-1.5 rounded-lg bg-accent/10 text-accent-light border border-accent/20"
              >
                <GlossaryText text={mode} />
              </span>
            ))}
          </div>
        </div>

        {/* Step-by-Step */}
        <div className="rounded-xl bg-surface border border-border p-4">
          <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-3">
            Step-by-Step in {app.appName}
          </h3>
          <ol className="space-y-3">
            {app.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent-light flex items-center justify-center text-xs font-semibold">
                  {i + 1}
                </span>
                <span className="leading-relaxed pt-0.5">
                  <GlossaryText text={step} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
