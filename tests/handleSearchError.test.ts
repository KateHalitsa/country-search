import { describe, it, expect } from "vitest";
import { handleSearchError } from "../src/components/algorithms/handleSearchError";
import { HttpError } from "../src/components/algorithms/HttpError";

describe("handleSearchError", () => {
  it("should return null for AbortError", () => {
    const error = new DOMException("Aborted", "AbortError");

    expect(handleSearchError(error)).toBeNull();
  });

  it("should return timeout message for TimeoutError", () => {
    const error = new DOMException("Timeout", "TimeoutError");

    expect(handleSearchError(error)).toBe(
      "The waiting time has expired. Please try again.",
    );
  });

  it("should return HTTP error message", () => {
    const error = new HttpError(500);

    expect(handleSearchError(error)).toBe("Server error: HTTP 500");
  });

  it("should return network error message", () => {
    const error = new TypeError("Failed to fetch");

    expect(handleSearchError(error)).toBe(
      "Unable to connect. Please check your internet connection.",
    );
  });
});
