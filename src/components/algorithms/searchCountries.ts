import { Country } from "../../types/types";
import { notImplemented } from "./debounce";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function searchCountries(
  query: string,
  signal: AbortSignal,
): Promise<Country[]> {
  notImplemented();
  return Promise.resolve([]);
}
