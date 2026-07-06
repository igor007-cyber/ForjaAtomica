interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`skeleton rounded-lg ${className}`} aria-hidden />;
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
