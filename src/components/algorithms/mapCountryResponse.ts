import { Country, CountryCard } from "../../types/types";

export function mapCountryResponse(raw: Country): CountryCard {
  return {
    name: raw.name,
    flag: raw.flags.png,
    capital: raw.capital || "No capital",
    region: raw.region,
    population: raw.population,
    languages: raw.languages.map((language) => language.name) ?? [],
  };
}
