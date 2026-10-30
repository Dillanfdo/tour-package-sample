import type { Package } from "@/lib/types";
import { formatPrice, nightsLabel } from "@/lib/format";
import { SafeImage } from "./SafeImage";

type PackageCardProps = {
  pkg: Package;
  enquireHref?: string;
  onEnquire?: () => void;
  ratio?: string;
};

export function PackageCard({
  pkg,
  enquireHref = "#contact",
  onEnquire,
  ratio = "aspect-[3/4]",
}: PackageCardProps) {
  return (
    <article className={`group relative overflow-hidden border border-[#e4ddd4] bg-[#f3eee6] ${ratio}`}>
      <SafeImage
        src={pkg.image}
        alt={`${pkg.title}, ${pkg.countries.join(", ")}`}
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/80 via-[#1a1410]/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 text-[#faf7f2]">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#f0d2c6]">{pkg.category}</p>
        <h3 className="font-heading text-2xl leading-tight">{pkg.title}</h3>
        <p className="text-sm text-white/85">{pkg.countries.join(" · ")}</p>
        <p className="text-sm">{nightsLabel(pkg.nights, pkg.days)}</p>
        <p className="max-h-24 overflow-hidden text-sm leading-relaxed text-white/80 md:max-h-0 md:opacity-0 md:transition md:duration-300 md:group-hover:max-h-24 md:group-hover:opacity-100">
          {pkg.summary}
        </p>
        <p className="flex flex-wrap items-baseline gap-2 pt-1">
          {pkg.originalPrice ? <span className="text-sm text-white/60 line-through">{formatPrice(pkg.originalPrice)}</span> : null}
          <span className="text-lg">{formatPrice(pkg.startingPrice)}</span>
        </p>
        <div className="mt-1 flex gap-4 text-xs uppercase tracking-[0.14em]">
          {onEnquire ? (
            <button type="button" onClick={onEnquire} className="border-b border-white/70 pb-0.5">
              Enquire
            </button>
          ) : (
            <a href={enquireHref} className="border-b border-white/70 pb-0.5">Enquire</a>
          )}
          <a href="#" className="border-b border-white/40 pb-0.5" aria-label={`View details for ${pkg.title}`}>
            View details
          </a>
        </div>
      </div>
    </article>
  );
}
