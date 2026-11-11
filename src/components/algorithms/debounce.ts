// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number,
): (...args: Args) => void {
  notImplemented();
  return () => {};
}
export function notImplemented() {
  throw new Error("Функция не реализована");
}
