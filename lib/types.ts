export type Category = "Group" | "Family" | "Honeymoon";

export type Package = {
  slug: string;
  title: string;
  countries: string[];
  nights: number;
  days: number;
  startingPrice: number;
  originalPrice?: number;
  category: Category;
  featured: boolean;
  summary: string;
  highlights: string[];
  image: string;
  departureMonths: string[];
};

export type Destination = {
  name: string;
  country: string;
  image: string;
};

export type Testimonial = {
  name: string;
  city: string;
  trip: string;
  quote: string;
  rating: number;
};

export type Stat = {
  id: string;
  value: number;
  decimals: number;
  suffix: string;
  label: string;
};
