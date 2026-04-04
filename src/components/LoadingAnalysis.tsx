export function LoadingAnalysis() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Medium & Style skeleton */}
      <div className="flex gap-3">
        <div className="flex-1 rounded-xl bg-surface p-4 border border-border">
          <div className="h-3 w-12 shimmer rounded mb-2" />
          <div className="h-5 w-24 shimmer rounded" />
        </div>
        <div className="flex-1 rounded-xl bg-surface p-4 border border-border">
          <div className="h-3 w-12 shimmer rounded mb-2" />
          <div className="h-5 w-28 shimmer rounded" />
        </div>
      </div>

      {/* Palette skeleton */}
      <div>
        <div className="h-3 w-24 shimmer rounded mb-3" />
        <div className="flex gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-12 h-12 rounded-lg shimmer" />
          ))}
        </div>
      </div>

      {/* Techniques skeleton */}
      <div>
        <div className="h-3 w-36 shimmer rounded mb-3" />
        <div className="grid grid-cols-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 rounded-xl shimmer" />
          ))}
        </div>
      </div>

      {/* Steps skeleton */}
      <div>
        <div className="h-6 w-40 shimmer rounded mb-4" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 rounded-xl shimmer" />
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-muted">
        Analyzing artwork techniques...
      </p>
    </div>
  );
}
