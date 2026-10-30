import Link from "next/link";
import { destinations, testimonials } from "@/data/packages";
import { company } from "@/lib/company";
import { EnquiryForm } from "./components/EnquiryForm";
import { FeaturedCarousel } from "./components/FeaturedCarousel";
import { HeroSearch } from "./components/HeroSearch";
import { SafeImage } from "./components/SafeImage";
import { StatCounters } from "./components/StatCounters";

export default function DesignThreeHome() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#12101c] text-white">
        <div className="glow-shift pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-[#00B4A6]/40 blur-3xl" />
        <div className="glow-shift pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-[#6C4CF1]/40 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="inline-flex rotate-[-2deg] rounded-xl bg-[#FFD23F] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-[#161326]">
            Now boarding 2026
          </p>
          <h1 className="mt-5 max-w-4xl font-heading text-5xl font-extrabold leading-[0.95] sm:text-7xl">
            Your Europe era starts here.
          </h1>
          <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/75 sm:text-lg">
            Group trips, family paces, honeymoon weeks. Bright fares from India, with the cities written big enough to screenshot.
          </p>
          <HeroSearch href="/design-3/packages" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-2 flex items-end justify-between gap-3">
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">Trending right now</h2>
          <Link href="/design-3/packages" className="text-sm font-extrabold text-[#5A3AD6] underline">
            All packages
          </Link>
        </div>
        <FeaturedCarousel />
      </section>

      <section id="gallery" className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">Where the group chat is going</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {destinations.map((place, index) => (
            <Link
              key={place.name}
              href={`/design-3/packages?countries=${encodeURIComponent(place.country)}`}
              className={`group relative overflow-hidden rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C4CF1] ${
                index === 0 ? "col-span-2 row-span-2 min-h-64 lg:min-h-80" : "min-h-40"
              }`}
            >
              <SafeImage src={place.image} alt={place.name} sizes={index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"} className="object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12101c]/80 to-transparent" />
              <div className="absolute bottom-0 p-4">
                <h3 className="font-heading text-2xl font-extrabold text-white">{place.name}</h3>
                <p className="text-sm font-semibold text-white/80">{place.country}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="rounded-[2rem] bg-gradient-to-r from-[#0E8C82] to-[#5A3AD6] p-6 text-white sm:p-8">
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">Why people send this link</h2>
          <div className="mt-6">
            <StatCounters />
          </div>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              ["Visa file, already named", "A checklist for your departure, not a generic PDF."],
              ["Hotels with a real evening", "Walkable streets, lifts when a family needs them."],
              ["Dinner that feels familiar", "Indian meals on group trips, skipped when you would rather not."],
              ["A human on WhatsApp", `${company.hours}. Same number before you fly and after you land.`],
            ].map(([title, text]) => (
              <li key={title} className="rounded-3xl bg-white p-4 text-[#161326]">
                <h3 className="font-heading text-lg font-extrabold">{title}</h3>
                <p className="mt-1 text-sm font-medium leading-relaxed text-[#3d3852]">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <h2 className="font-heading text-3xl font-extrabold">Real notes, not slogans</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {testimonials.map((item, index) => (
            <figure key={item.name} className={`rounded-3xl p-5 ${index % 2 === 0 ? "bg-[#FFD23F] text-[#161326]" : "bg-[#161326] text-white"}`}>
              <p className="text-xs font-extrabold uppercase tracking-wide opacity-70">{item.rating}.0 / 5 · {item.trip}</p>
              <blockquote className="mt-3 font-heading text-xl font-bold leading-snug">“{item.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-bold">
                {item.name}
                <span className="font-semibold opacity-70"> · {item.city}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] bg-[#12101c] p-6 text-white sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#FFD23F]">Enquire</p>
          <h2 className="mt-3 font-heading text-4xl font-extrabold leading-tight">Drop your number. We’ll do the dates.</h2>
          <p className="mt-4 text-sm font-medium leading-relaxed text-white/75">
            {company.phoneDisplay}<br />
            <a className="underline" href={company.emailHref}>{company.email}</a>
          </p>
        </div>
        <div className="rounded-[2rem] bg-white p-5 shadow-[0_12px_40px_rgba(22,19,38,0.06)] sm:p-6">
          <EnquiryForm idPrefix="d3-home" />
        </div>
      </section>
    </>
  );
}
