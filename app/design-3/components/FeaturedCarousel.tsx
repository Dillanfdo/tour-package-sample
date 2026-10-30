"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { featuredPackages } from "@/data/packages";
import { PackageCard } from "./PackageCard";

export function FeaturedCarousel() {
  const scroller = useRef<HTMLDivElement>(null);

  const move = (direction: number) => {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.max(node.clientWidth * 0.8, 280), behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        <button type="button" aria-label="Previous packages" onClick={() => move(-1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#161326] text-white">
          <ChevronLeft aria-hidden="true" />
        </button>
        <button type="button" aria-label="Next packages" onClick={() => move(1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#161326] text-white">
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {featuredPackages.map((pkg) => (
          <div key={pkg.slug} className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[32%]">
            <PackageCard pkg={pkg} variant="feature" enquireHref="#contact" />
          </div>
        ))}
      </div>
    </div>
  );
}
