import { HttpError } from "./HttpError";

export function handleSearchError(error: unknown) {
  if (hasErrorName(error, "AbortError")) {
    return null;
  }

  if (hasErrorName(error, "TimeoutError")) {
    return "The waiting time has expired. Please try again.";
  }

  if (error instanceof HttpError) {
    return `Server error: HTTP ${error.status}`;
  }

  return "Unable to connect. Please check your internet connection.";
}
function hasErrorName(error: unknown, name: string): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    error.name === name
  );
}
