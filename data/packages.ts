import type { Destination, Package, Stat, Testimonial } from "@/lib/types";

function unsplash(id: string): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80`;
}

export const packages: Package[] = [
  {
    slug: "europe-explorer",
    title: "Europe Explorer",
    countries: ["Austria", "France", "Germany", "Italy", "Switzerland"],
    nights: 11,
    days: 12,
    startingPrice: 145000,
    originalPrice: 168000,
    category: "Group",
    featured: true,
    summary:
      "The classic first Europe circuit: Paris, the Swiss Alps, Venice, Rome and a Rhine town, with group departures ex-Mumbai and ex-Delhi.",
    highlights: [
      "Seine photo stop and evening cruise",
      "Mt. Titlis or Jungfrau excursion",
      "Gondola ride in Venice",
      "Guided Colosseum district walk",
    ],
    image: unsplash("photo-1467269204594-9661b134dd2b"),
    departureMonths: ["March", "May", "September", "October"],
  },
  {
    slug: "scandinavia-wonders",
    title: "Scandinavia Wonders",
    countries: ["Norway", "Sweden", "Denmark"],
    nights: 9,
    days: 10,
    startingPrice: 189000,
    originalPrice: 214000,
    category: "Group",
    featured: true,
    summary:
      "Fjord country, Copenhagen’s harbours and Stockholm’s old town, paced for long summer days and a relaxed Indian breakfast start.",
    highlights: [
      "Norway fjord cruise",
      "Flam railway or equivalent scenic ride",
      "Copenhagen canal walk",
      "Stockholm Gamla Stan",
    ],
    image: unsplash("photo-1469474968028-56623f02e42e"),
    departureMonths: ["May", "June", "July", "August"],
  },
  {
    slug: "spain-portugal",
    title: "Spain & Portugal",
    countries: ["Spain", "Portugal"],
    nights: 8,
    days: 9,
    startingPrice: 125000,
    originalPrice: 142000,
    category: "Family",
    featured: true,
    summary:
      "Madrid, Barcelona and Lisbon with room for a free afternoon. A comfortable pace for parents travelling with children or grandparents.",
    highlights: [
      "Sagrada Familia exterior visit",
      "Madrid Retiro and old town",
      "Lisbon tram hill and Belem",
      "One leisure evening in each city",
    ],
    image: unsplash("photo-1539037116277-4db20889f2d4"),
    departureMonths: ["April", "June", "September", "December"],
  },
  {
    slug: "greece-island-escape",
    title: "Greece Island Escape",
    countries: ["Greece"],
    nights: 6,
    days: 7,
    startingPrice: 118000,
    category: "Honeymoon",
    featured: false,
    summary:
      "Athens plus a Santorini stay: caldera views, a sunset dinner and enough unscheduled time for a short honeymoon.",
    highlights: [
      "Acropolis guided visit",
      "Santorini caldera hotel area",
      "Sunset in Oia",
      "Optional catamaran afternoon",
    ],
    image: unsplash("photo-1570077188670-e3a8d69ac5ff"),
    departureMonths: ["April", "May", "September", "October"],
  },
  {
    slug: "paris-switzerland-honeymoon",
    title: "Paris & Switzerland Honeymoon",
    countries: ["France", "Switzerland"],
    nights: 7,
    days: 8,
    startingPrice: 175000,
    originalPrice: 198000,
    category: "Honeymoon",
    featured: true,
    summary:
      "Four nights between Paris and the lakes, then Interlaken or Lucerne. Private transfers on arrival and a reserved Seine hour.",
    highlights: [
      "Eiffel Tower access window",
      "Montmartre evening",
      "Swiss lake cruise",
      "Couple’s dinner reservation",
    ],
    image: unsplash("photo-1502602898657-3e91760cbb34"),
    departureMonths: ["February", "May", "September", "November"],
  },
  {
    slug: "northern-lights-lapland",
    title: "Northern Lights Lapland",
    countries: ["Finland", "Sweden"],
    nights: 5,
    days: 6,
    startingPrice: 192000,
    category: "Honeymoon",
    featured: false,
    summary:
      "A short winter escape north of the Arctic Circle: aurora hunts, a glass stay and one day with a Sámi cultural visit.",
    highlights: [
      "Guided aurora evening",
      "Glass or snow accommodation",
      "Reindeer or husky farm visit",
      "Sauna hour where available",
    ],
    image: unsplash("photo-1483347756197-71ef80e95f73"),
    departureMonths: ["December", "January", "February", "March"],
  },
  {
    slug: "italy-classic",
    title: "Italy Classic",
    countries: ["Italy"],
    nights: 7,
    days: 8,
    startingPrice: 112000,
    originalPrice: 129000,
    category: "Family",
    featured: false,
    summary:
      "Rome, Florence and Venice without changing hotels every night. Gelato stops included, museum entries kept to the ones worth the queue.",
    highlights: [
      "Colosseum and Roman Forum",
      "Florence Duomo quarter",
      "Tuscan countryside drive",
      "Venice St. Mark’s square",
    ],
    image: unsplash("photo-1552832230-c0197dd311b5"),
    departureMonths: ["March", "April", "October", "November"],
  },
  {
    slug: "euro-grand-tour",
    title: "Euro Grand Tour",
    countries: ["France", "Italy", "Switzerland", "Netherlands", "Belgium"],
    nights: 14,
    days: 15,
    startingPrice: 210000,
    originalPrice: 245000,
    category: "Group",
    featured: false,
    summary:
      "The long loop: Amsterdam to Paris, the Alps, Venice and Rome, with Brussels on the way. Built for travellers who want one departure to cover the icons.",
    highlights: [
      "Amsterdam canal belt",
      "Brussels grand place",
      "Swiss alpine day",
      "Rome and Venice highlights",
    ],
    image: unsplash("photo-1523906834658-6e24ef2386f9"),
    departureMonths: ["May", "June", "September"],
  },
];

export const destinations: Destination[] = [
  { name: "Paris", country: "France", image: unsplash("photo-1502602898657-3e91760cbb34") },
  { name: "Swiss Alps", country: "Switzerland", image: unsplash("photo-1530122037265-a5f1f91d3b99") },
  { name: "Rome", country: "Italy", image: unsplash("photo-1552832230-c0197dd311b5") },
  { name: "Santorini", country: "Greece", image: unsplash("photo-1613395877344-13d4a8e0d49e") },
  { name: "Barcelona", country: "Spain", image: unsplash("photo-1583422409516-2895a77efded") },
  { name: "Amsterdam", country: "Netherlands", image: unsplash("photo-1534351590666-13e3e96b5017") },
];

export const testimonials: Testimonial[] = [
  {
    name: "Ananya & Rohan Mehta",
    city: "Mumbai",
    trip: "Paris & Switzerland Honeymoon",
    quote:
      "The lake day in Lucerne was unhurried, and the Paris hotel was actually walkable to the metro. We stopped checking the itinerary after day two.",
    rating: 5,
  },
  {
    name: "Suresh Iyer",
    city: "Bengaluru",
    trip: "Europe Explorer",
    quote:
      "Twelve days sounds rushed on paper. On the ground the coach hops were short and we still had an evening free in Rome. Visa file was tidy.",
    rating: 5,
  },
  {
    name: "The Kapoor family",
    city: "Delhi",
    trip: "Spain & Portugal",
    quote:
      "Travelling with my parents and a seven-year-old, I cared about hotel lifts and dinner times. Both were thought through. Lisbon was the favourite.",
    rating: 4,
  },
  {
    name: "Meher Qureshi",
    city: "Pune",
    trip: "Northern Lights Lapland",
    quote:
      "We saw the lights on the second night, not the first, and nobody pretended otherwise. The glass cabin was worth the winter packing.",
    rating: 5,
  },
];

export const stats: Stat[] = [
  { id: "travellers", value: 5000, decimals: 0, suffix: "+", label: "Happy travellers" },
  { id: "years", value: 12, decimals: 0, suffix: "+", label: "Years planning Europe" },
  { id: "rating", value: 4.8, decimals: 1, suffix: "", label: "Average guest rating" },
  { id: "destinations", value: 40, decimals: 0, suffix: "+", label: "Destinations" },
];

export const countries: string[] = Array.from(
  new Set(packages.flatMap((item) => item.countries)),
).sort((a, b) => a.localeCompare(b));

export const featuredPackages = packages.filter((item) => item.featured);
