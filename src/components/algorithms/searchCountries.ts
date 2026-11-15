import { Country } from "../../types/types";
import { HttpError } from "./HttpError";

export async function searchCountries(
  query: string,
  signal: AbortSignal,
): Promise<Country[]> {
  const url = `https://countries.dev/name/${encodeURIComponent(query)}`;
  const timeoutSignal = AbortSignal.timeout(5000);
  const combinedSignal = AbortSignal.any([signal, timeoutSignal]);
  const response = await fetch(url, { signal: combinedSignal });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  return response.json();
}
