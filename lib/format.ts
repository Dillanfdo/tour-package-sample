const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const statNumber = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 1,
});

/** Indian rupee string. Spaces from some ICU builds are removed so the prefix stays ₹. */
export function formatPrice(amount: number): string {
  return inr.format(amount).replace(/[\u00A0\u202F\s]/g, "");
}

export function formatStat(value: number, decimals: number, suffix: string): string {
  const factor = 10 ** decimals;
  const rounded = Math.round(value * factor) / factor;
  const formatted = statNumber.format(rounded);
  return `${formatted}${suffix}`;
}

export function nightsLabel(nights: number, days: number): string {
  return `${nights} Nights / ${days} Days`;
}
