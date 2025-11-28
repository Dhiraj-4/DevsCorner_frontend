export function SkeletonBlock({ width = "100%", height = "1rem" }) {
  return (
    <div
      className="relative overflow-hidden rounded-md bg-neutral-300 dark:bg-neutral-800"
      style={{ width, height }}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] 
        bg-linear-to-r from-transparent 
        via-neutral-200/70 dark:via-neutral-600/40 
        to-transparent"
      />
    </div>
  );
}


export function SkeletonCircle({ width = "100%", height = "1rem" }) {
  return (
    <div
      className="relative overflow-hidden rounded-full bg-neutral-300 dark:bg-neutral-800 w-full h-full"
      style={{ width, height }}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] 
        bg-linear-to-r from-transparent 
        via-neutral-200/70 dark:via-neutral-600/40 
        to-transparent"
      />
    </div>
  );
}
