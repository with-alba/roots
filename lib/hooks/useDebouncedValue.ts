import { useCallback, useRef, useState } from "react";

/**
 *
 * @param initialValue - The initial value of the debounced value
 * @param delay - The delay in milliseconds
 * @returns - A tuple containing the debounced value and a function to set the debounced value
 */
export function useDebouncedValue<T>(
  initialValue: T,
  delay: number,
): [T, (value: T) => void] {
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const setDebouncedValueHandler = useCallback(
    (val: T) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setDebouncedValue(val);
      }, delay);
    },
    [delay],
  );

  return [debouncedValue, setDebouncedValueHandler];
}
