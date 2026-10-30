import Link from "next/link";
import { Headphones, ShieldCheck, Star, Utensils } from "lucide-react";
import { destinations, featuredPackages, stats, testimonials } from "@/data/packages";
import { formatStat } from "@/lib/format";
import { company } from "@/lib/company";
import { EnquiryForm } from "./components/EnquiryForm";
import { HeroSearch } from "./components/HeroSearch";
import { PackageCard } from "./components/PackageCard";
import { SafeImage } from "./components/SafeImage";

const reasons = [
  { icon: ShieldCheck, title: "Visa file, prepared", text: "A checklist matched to your departure, so the appointment is not the first time you see the papers." },
  { icon: Utensils, title: "Meals that travel well", text: "Indian dinner options on group trips, and restaurants that can seat a family without a fuss." },
  { icon: Headphones, title: "A person on the trip", text: "Group departures travel with a tour manager. Honeymoon plans have a direct number in India." },
  { icon: Star, title: "Hotels we have walked", text: "Locations chosen for the evening you actually have, not the photo on the rate sheet." },
];

export default function DesignOneHome() {
  return (
    <>
      <section className="relative">
        <div className="relative min-h-[32rem] sm:min-h-[38rem]">
          <SafeImage
            src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=2000&q=80"
            alt="Hallstatt village and lake in Austria"
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1830]/85 via-[#0c1830]/45 to-[#0c1830]/25" />
          <div className="relative mx-auto flex min-h-[32rem] max-w-6xl flex-col justify-end px-4 pb-24 pt-16 text-white sm:min-h-[38rem] sm:px-6 sm:pb-28">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F28C28]">Ex-Mumbai · Ex-Delhi</p>
            <h1 className="mt-3 max-w-3xl font-heading text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Europe tours from India, planned with care.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
              Group circuits, family paces and honeymoon pairs. Starting fares on twin sharing, with the cities written in plain language.
            </p>
          </div>
        </div>
        <div className="relative z-10 mx-auto -mt-14 max-w-6xl px-4 sm:px-6">
          <HeroSearch href="/design-1/packages" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c56a10]">Featured</p>
            <h2 className="mt-1 font-heading text-3xl font-semibold text-[#1B365D]">Departures guests book first</h2>
          </div>
          <Link href="/design-1/packages" className="text-sm font-semibold text-[#1B365D] underline">
            View all packages
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} enquireHref="#contact" />
          ))}
        </div>
      </section>

      <section id="gallery" className="bg-[#f4f7fb] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c56a10]">Gallery</p>
          <h2 className="mt-1 font-heading text-3xl font-semibold text-[#1B365D]">Popular destinations</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((place) => (
              <Link
                key={place.name}
                href={`/design-1/packages?countries=${encodeURIComponent(place.country)}`}
                className="group relative block h-52 overflow-hidden rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F28C28]"
              >
                <SafeImage
                  src={place.image}
                  alt={place.name}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1830]/75 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="font-heading text-xl font-semibold">{place.name}</h3>
                  <p className="text-sm text-white/85">{place.country}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#1B365D] py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F28C28]">Why choose us</p>
          <h2 className="mt-1 max-w-xl font-heading text-3xl font-semibold">A desk in India, and a plan that survives the first airport.</h2>
          <dl className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="rounded-lg bg-white/10 p-4">
                <dt className="text-sm text-white/75">{stat.label}</dt>
                <dd className="mt-1 font-heading text-3xl font-semibold">{formatStat(stat.value, stat.decimals, stat.suffix)}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => (
              <li key={reason.title} className="rounded-lg bg-white p-4 text-[#1c2838]">
                <reason.icon className="h-6 w-6 text-[#c56a10]" aria-hidden="true" />
                <h3 className="mt-3 font-heading text-lg font-semibold text-[#1B365D]">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#516074]">{reason.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c56a10]">Guests</p>
        <h2 className="mt-1 font-heading text-3xl font-semibold text-[#1B365D]">What they wrote home</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {testimonials.map((item) => (
            <figure key={item.name} className="rounded-lg border border-[#e6ebf2] bg-white p-5 shadow-sm">
              <div className="flex gap-1 text-[#F28C28]" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className={`h-4 w-4 ${index < item.rating ? "fill-current" : "text-[#d5deea]"}`} aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-[#314056]">“{item.quote}”</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-[#1B365D]">{item.name}</span>
                <span className="text-[#516074]"> · {item.city} · {item.trip}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-[#f4f7fb] py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c56a10]">Enquire</p>
            <h2 className="mt-1 font-heading text-3xl font-semibold text-[#1B365D]">Tell us the month. We’ll hold the dates.</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#516074]">
              Share a city, a headcount and the trip you circled. {company.name} calls back on {company.phoneDisplay}.
            </p>
            <p className="mt-6 text-sm text-[#314056]">
              <a className="font-semibold text-[#1B365D] underline" href={company.emailHref}>{company.email}</a>
            </p>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-sm sm:p-6">
            <EnquiryForm idPrefix="d1-home" />
          </div>
        </div>
      </section>
    </>
  );
}
