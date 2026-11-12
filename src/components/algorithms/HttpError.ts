export class HttpError extends Error {
  public status: number;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(status: number) {
    super();
    throw new Error("Not implemented");
  }
}
