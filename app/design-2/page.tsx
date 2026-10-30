import Link from "next/link";
import { destinations, featuredPackages, stats, testimonials } from "@/data/packages";
import { company } from "@/lib/company";
import { formatPrice, formatStat, nightsLabel } from "@/lib/format";
import { EnquiryForm } from "./components/EnquiryForm";
import { HeroSearch } from "./components/HeroSearch";
import { SafeImage } from "./components/SafeImage";

export default function DesignTwoHome() {
  const [lead, ...rest] = featuredPackages;

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#8C3E2C]">Europe, from India</p>
          <h1 className="mt-4 font-heading text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            The long way round.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[#5c534c]">
            Fewer cities, better evenings. Group circuits, family paces and honeymoon pairs, written as journeys rather than fare tables.
          </p>
          <HeroSearch href="/design-2/packages" />
        </div>
        <div className="grid h-[28rem] grid-cols-5 grid-rows-6 gap-3 sm:h-[36rem]">
          <div className="drift relative col-span-3 row-span-6 overflow-hidden">
            <SafeImage
              src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80"
              alt="Eiffel Tower and the Seine in Paris"
              sizes="(max-width: 1024px) 60vw, 30vw"
              priority
            />
          </div>
          <div className="drift-late relative col-span-2 row-span-3 overflow-hidden">
            <SafeImage
              src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=900&q=80"
              alt="Snow-covered peaks in the Swiss Alps"
              sizes="(max-width: 1024px) 40vw, 18vw"
            />
          </div>
          <div className="drift relative col-span-2 row-span-3 overflow-hidden">
            <SafeImage
              src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=900&q=80"
              alt="Gondolas on a canal in Venice"
              sizes="(max-width: 1024px) 40vw, 18vw"
            />
          </div>
        </div>
      </section>

      {lead ? (
        <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-heading text-4xl">In this issue</h2>
            <Link href="/design-2/packages" className="text-xs uppercase tracking-[0.16em] text-[#8C3E2C]">
              All packages
            </Link>
          </div>
          <article className="grid items-center gap-8 border-t border-[#e0d8ce] pt-8 lg:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4]">
              <SafeImage src={lead.image} alt={`${lead.title}, ${lead.countries.join(", ")}`} sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#8C3E2C]">{lead.category}</p>
              <h3 className="mt-3 font-heading text-4xl leading-tight sm:text-5xl">{lead.title}</h3>
              <p className="mt-4 text-sm text-[#5c534c]">{lead.countries.join(" · ")} · {nightsLabel(lead.nights, lead.days)}</p>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[#3c342e]">{lead.summary}</p>
              <ul className="mt-5 space-y-1 text-sm text-[#5c534c]">
                {lead.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-6 flex items-baseline gap-3">
                {lead.originalPrice ? <span className="text-sm text-[#8a7b70] line-through">{formatPrice(lead.originalPrice)}</span> : null}
                <span className="font-heading text-3xl">{formatPrice(lead.startingPrice)}</span>
              </p>
              <div className="mt-6 flex gap-6 text-xs uppercase tracking-[0.16em]">
                <a href="#contact" className="border-b border-[#2A2420] pb-1">Enquire</a>
                <a href="#" className="border-b border-[#cfc4b6] pb-1" aria-label={`View details for ${lead.title}`}>View details</a>
              </div>
            </div>
          </article>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {rest.map((pkg) => (
              <article key={pkg.slug} className="group relative aspect-[3/4] overflow-hidden border border-[#e4ddd4]">
                <SafeImage src={pkg.image} alt={`${pkg.title}, ${pkg.countries.join(", ")}`} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-[#faf7f2]">
                  <p className="text-[11px] uppercase tracking-[0.16em]">{pkg.category}</p>
                  <h3 className="mt-1 font-heading text-2xl">{pkg.title}</h3>
                  <p className="mt-1 text-sm">{nightsLabel(pkg.nights, pkg.days)}</p>
                  <p className="mt-2">{formatPrice(pkg.startingPrice)}</p>
                  <a href="#contact" className="mt-3 inline-block text-xs uppercase tracking-[0.14em] underline">Enquire</a>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section id="gallery" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-heading text-4xl">Places we return to</h2>
        <ol className="mt-8 divide-y divide-[#e0d8ce] border-y border-[#e0d8ce]">
          {destinations.map((place, index) => (
            <li key={place.name}>
              <Link
                href={`/design-2/packages?countries=${encodeURIComponent(place.country)}`}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 sm:grid-cols-[4rem_8rem_1fr_auto] sm:gap-6"
              >
                <span className="font-heading text-xl text-[#B5543A]">0{index + 1}</span>
                <span className="relative hidden h-16 overflow-hidden sm:block">
                  <SafeImage src={place.image} alt="" sizes="128px" />
                </span>
                <span>
                  <span className="block font-heading text-2xl">{place.name}</span>
                  <span className="text-sm text-[#5c534c]">{place.country}</span>
                </span>
                <span className="text-xs uppercase tracking-[0.14em] text-[#8C3E2C]">View</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section id="about" className="border-y border-[#e0d8ce]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="max-w-xl font-heading text-4xl leading-tight">Why travellers stay with the desk</h2>
          <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="border-t border-[#2A2420] pt-4">
                <dd className="font-heading text-5xl">{formatStat(stat.value, stat.decimals, stat.suffix)}</dd>
                <dt className="mt-2 text-sm text-[#5c534c]">{stat.label}</dt>
              </div>
            ))}
          </dl>
          <ul className="mt-12 grid gap-8 md:grid-cols-2">
            <li>
              <h3 className="font-heading text-2xl">The paperwork is dull on purpose</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5c534c]">Visa checklists arrive before the appointment, named for the departure you actually booked.</p>
            </li>
            <li>
              <h3 className="font-heading text-2xl">Hotels with a walkable evening</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5c534c]">We pick the street, then the room. Dinner is close enough that nobody needs a second taxi.</p>
            </li>
            <li>
              <h3 className="font-heading text-2xl">Indian kitchens, when you want them</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5c534c]">Group departures can keep a familiar dinner. Honeymoon tables can ignore that completely.</p>
            </li>
            <li>
              <h3 className="font-heading text-2xl">Someone answers from Mumbai</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5c534c]">{company.hours}. The same number is on the voucher and on WhatsApp.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-heading text-4xl">Letters</h2>
        <figure className="mt-8 max-w-3xl">
          <blockquote className="font-heading text-3xl leading-snug sm:text-4xl">“{testimonials[0].quote}”</blockquote>
          <figcaption className="mt-4 text-sm text-[#5c534c]">
            {testimonials[0].name}, {testimonials[0].city} — {testimonials[0].trip}
          </figcaption>
        </figure>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {testimonials.slice(1).map((item) => (
            <figure key={item.name} className="border-t border-[#e0d8ce] pt-4">
              <blockquote className="text-sm leading-relaxed">“{item.quote}”</blockquote>
              <figcaption className="mt-3 text-xs uppercase tracking-[0.12em] text-[#8C3E2C]">
                {item.name} · {item.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto grid max-w-6xl gap-12 px-4 py-8 pb-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8C3E2C]">Enquire</p>
          <h2 className="mt-3 font-heading text-5xl leading-tight">Write to the desk.</h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5c534c]">
            {company.phoneDisplay}<br />
            <a className="underline" href={company.emailHref}>{company.email}</a>
          </p>
        </div>
        <EnquiryForm idPrefix="d2-home" />
      </section>
    </>
  );
}
