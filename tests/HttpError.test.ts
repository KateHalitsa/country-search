import { describe, it, expect } from "vitest";
import { HttpError } from "../src/components/algorithms/HttpError";

describe("HttpError", () => {
  it("should be an instance of Error", () => {
    const error = new HttpError(500);

    expect(error).toBeInstanceOf(Error);
  });

  it("should have HttpError name", () => {
    const error = new HttpError(500);

    expect(error.name).toBe("HttpError");
  });

  it("should store HTTP status", () => {
    const error = new HttpError(500);

    expect(error.status).toBe(500);
  });
});
