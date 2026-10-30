"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { company } from "@/lib/company";

const base = "/design-3";

const links = [
  { href: base, label: "Home" },
  { href: `${base}/packages`, label: "Packages" },
  { href: `${base}#gallery`, label: "Gallery" },
  { href: `${base}#about`, label: "About" },
  { href: `${base}#contact`, label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-[#12101c] text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <div className="mr-auto">
          <Link href={base} className="font-heading text-lg font-extrabold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD23F]">
            <span className="bg-gradient-to-r from-[#00B4A6] to-[#8d7bff] bg-clip-text text-transparent">{company.name}</span>
          </Link>
          <Link href="/" className="block text-[11px] font-semibold uppercase tracking-wider text-white/60 hover:text-[#FFD23F]">
            Switch design
          </Link>
        </div>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const active =
              link.href === base
                ? pathname === base
                : link.href === `${base}/packages`
                  ? pathname.startsWith(`${base}/packages`)
                  : false;
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-1 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD23F] ${
                  active ? "bg-white/10 text-[#FFD23F]" : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href={`${base}#contact`}
          className="hidden rounded-full bg-[#FFD23F] px-4 py-2.5 text-sm font-extrabold text-[#161326] hover:bg-[#ffe27a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:inline-flex"
        >
          Enquire Now
        </Link>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 lg:hidden"
          aria-expanded={open}
          aria-controls="d3-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open ? (
        <nav id="d3-menu" className="fixed inset-0 z-[60] bg-[#12101c] px-6 py-6 text-white lg:hidden" aria-label="Mobile">
          <div className="mb-8 flex items-center justify-between">
            <p className="font-heading text-xl font-extrabold">{company.name}</p>
            <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10" onClick={() => setOpen(false)}>
              <span className="sr-only">Close menu</span>
              <X aria-hidden="true" />
            </button>
          </div>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="block rounded-2xl px-3 py-3 font-heading text-3xl font-bold" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={`${base}#contact`} onClick={() => setOpen(false)} className="mt-8 inline-flex rounded-full bg-[#FFD23F] px-5 py-3 font-extrabold text-[#161326]">
            Enquire Now
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
