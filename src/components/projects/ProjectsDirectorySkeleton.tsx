import React from "react";

export function ProjectsDirectorySkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading projects catalog"
      className="space-y-12 animate-pulse"
    >
      {/* Filter pills skeleton */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-10 w-28 sm:w-36 rounded-full bg-graphite-elevated/60 border border-border-subtle/40"
          />
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-border-subtle/60 bg-graphite/40 p-6 sm:p-8 space-y-6 min-h-[380px] flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-5 w-20 rounded-full bg-graphite-elevated/70" />
                <div className="h-5 w-24 rounded-full bg-graphite-elevated/70" />
              </div>
              <div className="h-7 w-3/4 rounded-md bg-graphite-elevated/80" />
              <div className="h-4 w-full rounded-md bg-graphite-elevated/50" />
              <div className="space-y-2 pt-2">
                <div className="h-3 w-5/6 rounded-md bg-graphite-elevated/40" />
                <div className="h-3 w-4/6 rounded-md bg-graphite-elevated/40" />
              </div>
            </div>
            <div className="pt-4 border-t border-border-subtle/40 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="h-6 w-14 rounded-md bg-graphite-elevated/60" />
                <div className="h-6 w-14 rounded-md bg-graphite-elevated/60" />
              </div>
              <div className="h-6 w-20 rounded-md bg-graphite-elevated/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
