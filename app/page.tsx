import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Choose a design",
};

const directions = [
  {
    href: "/design-1",
    packages: "/design-1/packages",
    name: "Classic Travel Agency",
    line: "Trustworthy and familiar, built to convert.",
    swatches: ["#1B365D", "#F28C28", "#FFFFFF"],
    preview: "classic" as const,
  },
  {
    href: "/design-2",
    packages: "/design-2/packages",
    name: "Modern Editorial",
    line: "Premium, image-led, and unhurried.",
    swatches: ["#FAF7F2", "#B5543A", "#2C2420"],
    preview: "editorial" as const,
  },
  {
    href: "/design-3",
    packages: "/design-3/packages",
    name: "Bold & Vibrant",
    line: "Energetic, social, and made for sharing.",
    swatches: ["#00B4A6", "#6C4CF1", "#FFD23F"],
    preview: "bold" as const,
  },
];

export default function ChooserPage() {
  return (
    <div className="min-h-screen bg-[#f3efe7] text-[#1c1915]">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7a6858]">
          Design pitch · Europe from India
        </p>
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">Your Brand Name</h1>
          <p className="mt-3 text-base leading-relaxed text-[#4e463d] sm:text-lg">
            Three ways to present the same home page and package catalogue. Open each direction and compare layout, type and colour.
          </p>
        </div>
      </header>
      <main className="mx-auto grid w-full max-w-6xl gap-5 px-4 pb-16 sm:px-6 lg:grid-cols-3">
        {directions.map((item, index) => (
          <article
            key={item.href}
            className="flex flex-col overflow-hidden rounded-2xl border border-[#e4dcd0] bg-white shadow-sm"
          >
            <Link href={item.href} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1c1915]">
              <Preview kind={item.preview} />
              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7764]">
                  0{index + 1}
                </p>
                <h2 className="text-2xl font-semibold tracking-tight group-hover:underline">{item.name}</h2>
                <p className="text-sm leading-relaxed text-[#5c534a]">{item.line}</p>
                <ul className="flex gap-2" aria-label={`${item.name} colours`}>
                  {item.swatches.map((colour) => (
                    <li key={colour}>
                      <span
                        className="block h-7 w-7 rounded-full border border-black/10"
                        style={{ backgroundColor: colour }}
                        title={colour}
                      />
                      <span className="sr-only">{colour}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
            <div className="mt-auto flex gap-4 border-t border-[#eee6dc] px-5 py-4 text-sm font-semibold">
              <Link
                href={item.href}
                className="rounded-sm text-[#1c1915] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1915]"
              >
                Open home
              </Link>
              <Link
                href={item.packages}
                className="rounded-sm text-[#1c1915] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1915]"
              >
                Open packages
              </Link>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}

function Preview({ kind }: { kind: "classic" | "editorial" | "bold" }) {
  if (kind === "classic") {
    return (
      <div className="h-44 bg-[#e7eef6] p-3" aria-hidden="true">
        <div className="mb-2 h-6 rounded bg-[#1B365D]" />
        <div className="relative h-24 rounded bg-[#1B365D]/80">
          <div className="absolute -bottom-3 left-3 right-3 h-8 rounded bg-white shadow" />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="h-8 rounded bg-white shadow-sm" />
          <div className="h-8 rounded bg-white shadow-sm" />
          <div className="h-8 rounded bg-white shadow-sm" />
        </div>
      </div>
    );
  }
  if (kind === "editorial") {
    return (
      <div className="grid h-44 grid-cols-2 bg-[#FAF7F2]" aria-hidden="true">
        <div className="flex flex-col justify-end p-4">
          <div className="h-2 w-10 bg-[#B5543A]" />
          <div className="mt-3 h-3 w-24 bg-[#2C2420]" />
          <div className="mt-2 h-3 w-16 bg-[#2C2420]/70" />
        </div>
        <div className="grid grid-rows-3 gap-1 p-3">
          <div className="row-span-2 bg-[#d9cfc3]" />
          <div className="grid grid-cols-2 gap-1">
            <div className="bg-[#c4b6a8]" />
            <div className="bg-[#b5543a]/70" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="h-44 bg-[#12101c] p-3" aria-hidden="true">
      <div className="mb-3 h-2 w-16 rounded-full bg-[#FFD23F]" />
      <div className="h-8 w-40 rounded-xl bg-gradient-to-r from-[#00B4A6] to-[#6C4CF1]" />
      <div className="mt-4 flex gap-2">
        <div className="h-16 w-24 rounded-2xl bg-white/90" />
        <div className="h-16 w-24 rounded-2xl bg-white/70" />
        <div className="h-16 flex-1 rounded-2xl bg-[#FFD23F]" />
      </div>
    </div>
  );
}
