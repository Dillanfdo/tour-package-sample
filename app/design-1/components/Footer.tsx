import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { company } from "@/lib/company";

const base = "/design-1";

export function Footer() {
  return (
    <footer className="bg-[#1B365D] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-xl font-semibold">{company.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Europe tour packages from India. Flights, hotels and day plans arranged as one departure.
          </p>
          <p className="mt-4 text-sm text-white/80">{company.address}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#F28C28]">Quick links</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:underline" href={base}>Home</Link></li>
            <li><Link className="hover:underline" href={`${base}/packages`}>Packages</Link></li>
            <li><Link className="hover:underline" href={`${base}#gallery`}>Gallery</Link></li>
            <li><Link className="hover:underline" href={`${base}#about`}>About</Link></li>
            <li><Link className="hover:underline" href={`${base}#contact`}>Contact</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#F28C28]">Contact</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/90">
            <li><a className="hover:underline" href={company.phoneHref}>{company.phoneDisplay}</a></li>
            <li><a className="hover:underline" href={company.emailHref}>{company.email}</a></li>
            <li><a className="hover:underline" href={company.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp {company.whatsappDisplay}</a></li>
            <li>{company.hours}</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/30 p-2 hover:bg-white/10"><Instagram className="h-4 w-4" /></a>
            <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/30 p-2 hover:bg-white/10"><Facebook className="h-4 w-4" /></a>
            <a aria-label="YouTube" href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/30 p-2 hover:bg-white/10"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15 py-4 text-center text-xs text-white/70">
        © {new Date().getFullYear()} {company.name}. All rights reserved.
      </div>
    </footer>
  );
}
