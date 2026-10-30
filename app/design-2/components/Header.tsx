"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { company } from "@/lib/company";

const base = "/design-2";

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
    <header className="sticky top-0 z-40 border-b border-[#e6dfd6] bg-[#faf7f2]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4 sm:px-6">
        <div className="mr-auto">
          <Link href={base} className="font-heading text-2xl italic text-[#2A2420] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B5543A]">
            {company.name}
          </Link>
          <Link href="/" className="mt-0.5 block text-[11px] uppercase tracking-[0.16em] text-[#8a7768] hover:text-[#B5543A]">
            Switch design
          </Link>
        </div>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
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
                className={`text-sm tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B5543A] ${
                  active ? "text-[#B5543A]" : "text-[#2A2420] hover:text-[#B5543A]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href={`${base}#contact`}
          className="hidden border border-[#2A2420] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#2A2420] transition hover:bg-[#2A2420] hover:text-[#FAF7F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B5543A] sm:inline-flex"
        >
          Enquire Now
        </Link>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-[#2A2420] lg:hidden"
          aria-expanded={open}
          aria-controls="d2-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open ? (
        <nav id="d2-menu" className="fixed inset-0 z-[60] bg-[#faf7f2] px-6 py-6 lg:hidden" aria-label="Mobile">
          <div className="mb-10 flex items-center justify-between">
            <p className="font-heading text-2xl italic">{company.name}</p>
            <button type="button" className="inline-flex h-10 w-10 items-center justify-center border border-[#2A2420]" onClick={() => setOpen(false)}>
              <span className="sr-only">Close menu</span>
              <X aria-hidden="true" />
            </button>
          </div>
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="font-heading text-4xl" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={`${base}#contact`} onClick={() => setOpen(false)} className="mt-10 inline-flex border border-[#2A2420] px-5 py-3 text-xs uppercase tracking-[0.16em]">
            Enquire Now
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
