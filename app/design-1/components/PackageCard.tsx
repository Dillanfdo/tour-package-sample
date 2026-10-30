import type { Package } from "@/lib/types";
import { formatPrice, nightsLabel } from "@/lib/format";
import { SafeImage } from "./SafeImage";

type PackageCardProps = {
  pkg: Package;
  enquireHref?: string;
  onEnquire?: () => void;
};

export function PackageCard({ pkg, enquireHref = "#contact", onEnquire }: PackageCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-[#e6ebf2] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-48">
        <SafeImage
          src={pkg.image}
          alt={`${pkg.title}, ${pkg.countries.join(", ")}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-[#F28C28] px-3 py-1 text-sm font-semibold text-[#1B365D]">
          {formatPrice(pkg.startingPrice)}
        </span>
        <span className="absolute bottom-3 right-3 rounded bg-[#1B365D] px-2 py-1 text-xs font-medium text-white">
          {nightsLabel(pkg.nights, pkg.days)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#c56a10]">{pkg.category}</p>
        <h3 className="font-heading text-lg font-semibold text-[#1B365D]">{pkg.title}</h3>
        <p className="text-sm text-[#516074]">{pkg.countries.join(" · ")}</p>
        <p className="line-clamp-2 text-sm leading-relaxed text-[#314056]">{pkg.summary}</p>
        <p className="text-xs text-[#5d6b7c]">Departs {pkg.departureMonths.join(", ")}</p>
        <div className="mt-auto pt-2">
          <p className="text-xs text-[#5d6b7c]">Starting price, per person</p>
          <p className="flex flex-wrap items-baseline gap-2">
            {pkg.originalPrice ? (
              <span className="text-sm text-[#7b8794] line-through">{formatPrice(pkg.originalPrice)}</span>
            ) : null}
            <span className="text-lg font-semibold text-[#1B365D]">{formatPrice(pkg.startingPrice)}</span>
          </p>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {onEnquire ? (
            <button
              type="button"
              onClick={onEnquire}
              className="rounded-lg bg-[#F28C28] px-3 py-2 text-sm font-semibold text-[#1B365D] hover:bg-[#ffb15c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B365D]"
            >
              Enquire
            </button>
          ) : (
            <a
              href={enquireHref}
              className="rounded-lg bg-[#F28C28] px-3 py-2 text-center text-sm font-semibold text-[#1B365D] hover:bg-[#ffb15c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B365D]"
            >
              Enquire
            </a>
          )}
          <a
            href="#"
            className="rounded-lg border border-[#1B365D] px-3 py-2 text-center text-sm font-semibold text-[#1B365D] hover:bg-[#f4f7fb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F28C28]"
            aria-label={`View details for ${pkg.title}`}
          >
            View details
          </a>
        </div>
      </div>
    </article>
  );
}
