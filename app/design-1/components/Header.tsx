"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { company } from "@/lib/company";

const base = "/design-1";

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
    <header className="sticky top-0 z-40">
      <div className="hidden bg-[#1B365D] text-white sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-sm sm:px-6">
          <p>Europe tours from India · {company.hours}</p>
          <div className="flex items-center gap-4">
            <a className="inline-flex items-center gap-1.5 hover:underline" href={company.phoneHref}>
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {company.phoneDisplay}
            </a>
            <a className="hover:underline" href={company.emailHref}>
              {company.email}
            </a>
          </div>
        </div>
      </div>
      <div className="border-b border-[#e6ebf2] bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <div className="mr-auto flex items-center gap-2">
            <Link href={base} className="flex items-center gap-2 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F28C28]">
              <span className="grid h-9 w-9 place-items-center rounded bg-[#1B365D] text-sm font-semibold text-white">YB</span>
              <span className="font-heading text-base font-semibold text-[#1B365D]">{company.name}</span>
            </Link>
            <Link href="/" className="text-xs text-[#5d6b7c] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F28C28]">
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
                  className={`rounded-sm text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F28C28] ${
                    active ? "text-[#F28C28]" : "text-[#1B365D] hover:text-[#F28C28]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href={`${base}#contact`}
            className="hidden rounded-lg bg-[#F28C28] px-4 py-2.5 text-sm font-semibold text-[#1B365D] hover:bg-[#ffb15c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B365D] sm:inline-flex"
          >
            Enquire Now
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#d5deea] text-[#1B365D] lg:hidden"
            aria-expanded={open}
            aria-controls="d1-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav id="d1-menu" className="fixed inset-0 z-[60] bg-white px-6 py-6 lg:hidden" aria-label="Mobile">
          <div className="mb-8 flex items-center justify-between">
            <p className="font-heading text-lg font-semibold text-[#1B365D]">{company.name}</p>
            <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-md border" onClick={() => setOpen(false)}>
              <span className="sr-only">Close menu</span>
              <X aria-hidden="true" />
            </button>
          </div>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="block rounded-lg px-2 py-3 text-lg font-medium text-[#1B365D]" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`${base}#contact`}
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex w-full justify-center rounded-lg bg-[#F28C28] px-4 py-3 font-semibold text-[#1B365D]"
          >
            Enquire Now
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
