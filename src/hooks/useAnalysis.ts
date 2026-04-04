"use client";

import { useState, useCallback } from "react";
import type { AnalysisResult, TokenUsage } from "@/lib/types";

export function useAnalysis() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [rawText, setRawText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenUsage, setTokenUsage] = useState<TokenUsage | null>(null);

  const analyze = useCallback(async (image: File) => {
    setIsLoading(true);
    setError(null);
    setRawText("");
    setResult(null);
    setTokenUsage(null);

    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.error) {
                setError(parsed.error);
                continue;
              }
              if (parsed.usage) {
                setTokenUsage(parsed.usage as TokenUsage);
                continue;
              }
              if (parsed.text) {
                accumulated += parsed.text;
                setRawText(accumulated);
              }
            } catch {
              // Partial JSON, skip
            }
          }
        }
      }

      // Parse the complete JSON
      try {
        let jsonStr = accumulated.trim();
        if (jsonStr.startsWith("```")) {
          jsonStr = jsonStr
            .replace(/^```(?:json)?\n?/, "")
            .replace(/\n?```$/, "");
        }
        const parsed = JSON.parse(jsonStr) as AnalysisResult;
        setResult(parsed);
      } catch {
        setError("Failed to parse analysis results. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { result, rawText, isLoading, error, tokenUsage, analyze };
}
