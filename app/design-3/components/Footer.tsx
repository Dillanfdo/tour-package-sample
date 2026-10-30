import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { company } from "@/lib/company";

const base = "/design-3";

export function Footer() {
  return (
    <footer className="bg-[#12101c] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-2xl font-extrabold">{company.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Europe, booked like a plan you would actually send in the group chat.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#FFD23F]">Quick links</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            <li><Link className="hover:text-[#00B4A6]" href={base}>Home</Link></li>
            <li><Link className="hover:text-[#00B4A6]" href={`${base}/packages`}>Packages</Link></li>
            <li><Link className="hover:text-[#00B4A6]" href={`${base}#gallery`}>Gallery</Link></li>
            <li><Link className="hover:text-[#00B4A6]" href={`${base}#about`}>About</Link></li>
            <li><Link className="hover:text-[#00B4A6]" href={`${base}#contact`}>Contact</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#FFD23F]">Contact</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            <li>{company.address}</li>
            <li><a className="hover:text-[#00B4A6]" href={company.phoneHref}>{company.phoneDisplay}</a></li>
            <li><a className="hover:text-[#00B4A6]" href={company.emailHref}>{company.email}</a></li>
            <li><a className="hover:text-[#00B4A6]" href={company.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp {company.whatsappDisplay}</a></li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-white/10 p-2 hover:bg-white/20"><Instagram className="h-4 w-4" /></a>
            <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-white/10 p-2 hover:bg-white/20"><Facebook className="h-4 w-4" /></a>
            <a aria-label="YouTube" href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-white/10 p-2 hover:bg-white/20"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {company.name}. All rights reserved.
      </div>
    </footer>
  );
}
