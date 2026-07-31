export default function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200/70 dark:bg-slate-700/50 ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="card p-5">
      <Skeleton className="h-4 w-24 mb-3" />
      <Skeleton className="h-8 w-16 mb-2" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b border-slate-100 dark:border-slate-800">
      <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-24 hidden sm:block" />
      <Skeleton className="h-4 w-20 hidden md:block" />
      <Skeleton className="h-6 w-20 rounded-full ml-auto" />
    </div>
  );
}
