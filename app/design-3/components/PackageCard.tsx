import type { Package } from "@/lib/types";
import { formatPrice, nightsLabel } from "@/lib/format";
import { SafeImage } from "./SafeImage";

type PackageCardProps = {
  pkg: Package;
  variant?: "feature" | "list";
  enquireHref?: string;
  onEnquire?: () => void;
};

export function PackageCard({ pkg, variant = "list", enquireHref = "#contact", onEnquire }: PackageCardProps) {
  const sticker = pkg.featured ? "Trending" : pkg.category;
  const stickerClass =
    sticker === "Trending"
      ? "bg-[#FFD23F] text-[#161326]"
      : sticker === "Honeymoon"
        ? "bg-[#6C4CF1] text-white"
        : sticker === "Family"
          ? "bg-white text-[#161326]"
          : "bg-[#00B4A6] text-[#06211e]";

  const enquire = onEnquire ? (
    <button type="button" onClick={onEnquire} className={primaryBtn}>Enquire</button>
  ) : (
    <a href={enquireHref} className={primaryBtn}>Enquire</a>
  );

  if (variant === "feature") {
    return (
      <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_12px_40px_rgba(18,16,28,0.12)]">
        <div className="relative h-64">
          <SafeImage src={pkg.image} alt={`${pkg.title}, ${pkg.countries.join(", ")}`} sizes="(max-width: 768px) 85vw, 33vw" className="object-cover" />
          <span className={`absolute left-3 top-3 rotate-[-2deg] rounded-xl px-3 py-1 text-xs font-extrabold uppercase tracking-wide ${stickerClass}`}>
            {sticker}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="font-heading text-xl font-extrabold">{pkg.title}</h3>
          <p className="text-sm font-medium text-[#5c5670]">{pkg.countries.join(" · ")}</p>
          <p className="text-sm font-bold">{nightsLabel(pkg.nights, pkg.days)}</p>
          <p className="mt-auto flex items-baseline gap-2 pt-2">
            {pkg.originalPrice ? <span className="text-sm font-semibold text-[#8b86a0] line-through">{formatPrice(pkg.originalPrice)}</span> : null}
            <span className="font-heading text-xl font-extrabold">{formatPrice(pkg.startingPrice)}</span>
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {enquire}
            <a href="#" className={ghostBtn} aria-label={`View details for ${pkg.title}`}>View details</a>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-4 rounded-3xl bg-white p-3 shadow-[0_10px_30px_rgba(22,19,38,0.06)] sm:flex-row">
      <div className="relative aspect-[16/10] min-h-40 overflow-hidden rounded-2xl sm:aspect-auto sm:w-64 sm:shrink-0 sm:self-stretch">
        <SafeImage src={pkg.image} alt={`${pkg.title}, ${pkg.countries.join(", ")}`} sizes="(max-width: 640px) 100vw, 256px" className="object-cover" />
        <span className={`absolute left-3 top-3 rotate-[-2deg] rounded-xl px-3 py-1 text-xs font-extrabold uppercase tracking-wide ${stickerClass}`}>
          {sticker}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-1 pb-2 sm:py-2 sm:pr-3">
        <h3 className="font-heading text-2xl font-extrabold leading-tight">{pkg.title}</h3>
        <p className="text-sm font-semibold text-[#5c5670]">{pkg.countries.join(" · ")}</p>
        <p className="text-sm font-bold text-[#161326]">{nightsLabel(pkg.nights, pkg.days)}</p>
        <p className="text-sm leading-relaxed text-[#3d3852]">{pkg.summary}</p>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#6C4CF1]">Departs {pkg.departureMonths.join(", ")}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <p className="flex items-baseline gap-2">
            {pkg.originalPrice ? <span className="text-sm font-semibold text-[#8b86a0] line-through">{formatPrice(pkg.originalPrice)}</span> : null}
            <span className="font-heading text-2xl font-extrabold">{formatPrice(pkg.startingPrice)}</span>
          </p>
          <div className="flex gap-2">
            {enquire}
            <a href="#" className={ghostBtn} aria-label={`View details for ${pkg.title}`}>View details</a>
          </div>
        </div>
      </div>
    </article>
  );
}

const primaryBtn =
  "inline-flex items-center justify-center rounded-full bg-[#161326] px-4 py-2.5 text-center text-sm font-extrabold text-white hover:bg-[#2a2542] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C4CF1]";

const ghostBtn =
  "inline-flex items-center justify-center rounded-full border-2 border-[#161326] px-4 py-2 text-center text-sm font-extrabold text-[#161326] hover:bg-[#FFD23F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C4CF1]";
