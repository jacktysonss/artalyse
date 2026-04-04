import type { Technique } from "@/lib/types";

const confidenceColors = {
  high: "bg-green-500/20 text-green-400 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  low: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

interface TechniqueChipProps {
  technique: Technique;
  onClick?: () => void;
  isExpanded?: boolean;
}

export function TechniqueChip({
  technique,
  onClick,
  isExpanded,
}: TechniqueChipProps) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-xl border transition-all duration-200 ${
        confidenceColors[technique.confidence]
      } ${isExpanded ? "col-span-full" : ""}`}
    >
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="text-sm font-medium">{technique.name}</span>
        <span className="text-[10px] uppercase tracking-wider opacity-70">
          {technique.confidence}
        </span>
      </div>
      {isExpanded && (
        <div className="px-3 pb-3 text-sm opacity-80">
          {technique.description}
        </div>
      )}
    </button>
  );
}
