/**
 * Debounce function that delays invoking the provided function until after
 * a specified delay has elapsed since the last time the debounced function was invoked.
 * @param func - The function to debounce.
 * @param wait - The number of milliseconds to delay.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function _debounce(...args: Parameters<T>): void {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => func(...args), wait);
  };
}
