import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { company } from "@/lib/company";

const base = "/design-2";

export function Footer() {
  return (
    <footer className="border-t border-[#e0d8ce]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-3xl italic">{company.name}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#5c534c]">
            A quieter desk for Europe. Same routes, fewer banners, more of the day left open.
          </p>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-[0.18em] text-[#8C3E2C]">Index</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="hover:text-[#B5543A]" href={base}>Home</Link></li>
            <li><Link className="hover:text-[#B5543A]" href={`${base}/packages`}>Packages</Link></li>
            <li><Link className="hover:text-[#B5543A]" href={`${base}#gallery`}>Gallery</Link></li>
            <li><Link className="hover:text-[#B5543A]" href={`${base}#about`}>About</Link></li>
            <li><Link className="hover:text-[#B5543A]" href={`${base}#contact`}>Contact</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-[0.18em] text-[#8C3E2C]">Studio</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#3c342e]">
            <li>{company.address}</li>
            <li><a className="hover:text-[#B5543A]" href={company.phoneHref}>{company.phoneDisplay}</a></li>
            <li><a className="hover:text-[#B5543A]" href={company.emailHref}>{company.email}</a></li>
            <li><a className="hover:text-[#B5543A]" href={company.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          </ul>
          <div className="mt-5 flex gap-4 text-[#2A2420]">
            <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#B5543A]"><Instagram className="h-4 w-4" /></a>
            <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#B5543A]"><Facebook className="h-4 w-4" /></a>
            <a aria-label="YouTube" href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#B5543A]"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-[#e0d8ce] py-5 text-center text-xs tracking-wide text-[#7a6e64]">
        © {new Date().getFullYear()} {company.name}
      </div>
    </footer>
  );
}
