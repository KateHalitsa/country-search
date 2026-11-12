export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number,
): (...args: Args) => void {
  let timerId: number | null = null;

  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export function notImplemented() {
  throw new Error("Функция не реализована");
}
