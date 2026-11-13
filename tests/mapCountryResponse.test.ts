import { describe, it, expect } from "vitest";
import { mapCountryResponse } from "../src/components/algorithms/mapCountryResponse";
import mockCounties from "./testData.json";
import mockCountiesWithMissingFields from "./testDataWithMissingFields.json";
import type { Country } from "../src/types/types";

describe("mapCountryResponse", () => {
  const rawCountries: Country[] = mockCounties;
  const rawCountriesWithMissingFields: Country[] =
    mockCountiesWithMissingFields;
  it("should map all country fields correctly", () => {
    const result = mapCountryResponse(rawCountries[0]);
    expect(result.name).toBe("Belarus");
    expect(result.capital).toBe("Minsk");
    expect(result.flag).toBe("https://flagcdn.com/w320/by.png");
    expect(result.languages).toEqual(["Belarusian", "Russian"]);
    expect(result.population).toBe(9398861);
    expect(result.region).toBe("Europe");
  });

  it("should not mutate the original object", () => {
    const original = structuredClone(rawCountries[0]);

    mapCountryResponse(rawCountries[0]);

    expect(rawCountries[0]).toEqual(original);
  });

  it("should handle missing capital", () => {
    const result = mapCountryResponse(rawCountriesWithMissingFields[1]);

    expect(result.capital).toBe("No capital");
  });

  it("should handle missing languages", () => {
    const result = mapCountryResponse(rawCountriesWithMissingFields[0]);

    expect(result.languages).toEqual([]);
  });
});
