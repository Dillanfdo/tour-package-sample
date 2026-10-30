"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/packages";
import { formatStat } from "@/lib/format";

export function StatCounters() {
  const root = useRef<HTMLDListElement>(null);
  const [progress, setProgress] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started.current) return;
        started.current = true;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
          setProgress(1);
          return;
        }
        const start = performance.now();
        const duration = 1100;
        const tick = (now: number) => {
          const next = Math.min(1, (now - start) / duration);
          setProgress(1 - (1 - next) ** 3);
          if (next < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <dl ref={root} className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.id} className="rounded-3xl bg-white/10 p-4">
          <dt className="text-sm font-semibold text-white/70">{stat.label}</dt>
          <dd className="mt-1 font-heading text-4xl font-extrabold text-[#FFD23F]">
            {formatStat(stat.value * progress, stat.decimals, progress > 0.98 ? stat.suffix : "")}
          </dd>
        </div>
      ))}
    </dl>
  );
}
