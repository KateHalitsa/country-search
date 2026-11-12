import { beforeEach, describe, expect, it, vi } from "vitest";
import mockCounties from "./testData.json";
import { searchCountries } from "../src/components/algorithms/searchCountries";

describe("searchCountries", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("successful request", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(mockCounties), {
        status: 200,
      }),
    );
    const controller = new AbortController();

    const res = await searchCountries("Bel", controller.signal);
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://countries.dev/name/Bel",
      expect.objectContaining({
        signal: controller.signal,
      }),
    );
    expect(res).toHaveLength(3);
    expect(res.some((country) => country.name === "Belarus")).toBe(true);
  });

  it("returns an empty array when response status is 404", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 404 }),
    );
    const controller = new AbortController();

    await expect(
      searchCountries("Genovia", controller.signal),
    ).resolves.toEqual([]);
  });
  it("throws HttpError when response status is 500", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 500 }),
    );

    const controller = new AbortController();

    await expect(
      searchCountries("Bel", controller.signal),
    ).rejects.toMatchObject({
      status: 500,
    });
  });
  it("throws an error when network request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new TypeError("Failed to fetch"),
    );

    const controller = new AbortController();

    await expect(searchCountries("Bel", controller.signal)).rejects.toThrow(
      "Failed to fetch",
    );
  });
  it("throws AbortError when request is aborted", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(
      (_url, options) =>
        new Promise((_, reject) => {
          options?.signal?.addEventListener("abort", () => {
            reject(new DOMException("Aborted", "AbortError"));
          });
        }),
    );
    const controller = new AbortController();
    const promise = searchCountries("Bel", controller.signal);

    controller.abort();

    await expect(promise).rejects.toMatchObject({
      name: "AbortError",
    });
  });
});
