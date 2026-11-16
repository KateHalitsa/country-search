import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderScreen } from "../src/index";
import mockCountries from "./testData.json";
import { searchHandler } from "../src/components/handlers/searchHandler";
const belarusFixture = mockCountries.find(
  (country) => country.name === "Belarus",
);

function createAbortableFetchMock() {
  const requests: {
    url: string;
    signal: AbortSignal;
    resolve: (response: Response) => void;
  }[] = [];

  const mockFetch = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
    return new Promise<Response>((resolve, reject) => {
      const signal = init?.signal as AbortSignal;

      const request = {
        url: String(input),
        signal,
        resolve,
      };

      requests.push(request);

      if (signal.aborted) {
        reject(new DOMException("Aborted", "AbortError"));
        return;
      }

      signal.addEventListener(
        "abort",
        () => {
          reject(new DOMException("Aborted", "AbortError"));
        },
        { once: true },
      );
    });
  });

  return { mockFetch, requests };
}

describe("searchCountries", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  it("should ignore an outdated request when a newer request finishes", async () => {
    const { mockFetch, requests } = createAbortableFetchMock();

    vi.stubGlobal("fetch", mockFetch);

    const elements = renderScreen();

    searchHandler(elements);

    elements.input.value = "Bel";
    elements.input.dispatchEvent(new Event("input"));

    await vi.advanceTimersByTimeAsync(1000);

    expect(requests).toHaveLength(1);
    expect(requests[0].signal.aborted).toBe(false);

    elements.input.value = "Net";
    elements.input.dispatchEvent(new Event("input"));

    expect(requests[0].signal.aborted).toBe(true);

    await vi.advanceTimersByTimeAsync(1000);

    expect(requests).toHaveLength(2);

    requests[1].resolve({
      status: 200,
      ok: true,
      json: async () => [belarusFixture],
    } as Response);

    await vi.waitFor(() => {
      expect(elements.cardSection.children).toHaveLength(1);
    });

    expect(elements.message.textContent).toBe("");
  });
});
