import { HttpError } from "./HttpError";

export function handleSearchError(error: unknown) {
  if (error instanceof Error && error.name === "AbortError") {
    return null;
  }

  if (error instanceof Error && error.name === "TimeoutError") {
    return "The waiting time has expired. Please try again.";
  }

  if (error instanceof HttpError) {
    return `Server error: HTTP ${error.status}`;
  }

  return "Unable to connect. Please check your internet connection.";
}
