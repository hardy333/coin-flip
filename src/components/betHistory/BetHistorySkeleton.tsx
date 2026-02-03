interface BetHistorySkeletonProps {
  count?: number;
}

export const BetHistorySkeleton = ({ count = 5 }: BetHistorySkeletonProps) => {
  return (
    <div className="space-y-2">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02] animate-pulse"
        >
          <div className="flex items-center gap-3">
            {/* Icon skeleton */}
            <div className="w-10 h-10 rounded-lg bg-white/10" />

            {/* Text skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-16 rounded bg-white/10" />
              <div className="h-3 w-20 rounded bg-white/5" />
            </div>
          </div>

          {/* Amount skeleton */}
          <div className="text-right space-y-2">
            <div className="h-4 w-24 rounded bg-white/10 ml-auto" />
            <div className="h-3 w-16 rounded bg-white/5 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
};
