import { describe, it, expect, vi, afterEach } from "vitest";
import { debounce } from "../src/components/algorithms/debounce";

describe("debounce", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should not call function immediately", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const debouncedFn = debounce(fn, 500);

    debouncedFn();

    expect(fn).not.toHaveBeenCalled();
  });

  it("should call function after delay", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const debouncedFn = debounce(fn, 500);

    debouncedFn();

    vi.advanceTimersByTime(500);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should reset timer when called again", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const debouncedFn = debounce(fn, 500);

    debouncedFn();

    vi.advanceTimersByTime(300);

    debouncedFn();

    vi.advanceTimersByTime(300);

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(200);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should pass arguments from the last call", () => {
    vi.useFakeTimers();

    const fn = vi.fn();
    const debouncedFn = debounce(fn, 500);

    debouncedFn("first");
    debouncedFn("second");
    debouncedFn("third");

    vi.advanceTimersByTime(500);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("third");
  });
});
