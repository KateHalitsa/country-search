export function debounce(fn, delay) {
    let timerId = null;
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
