import { useEffect, useRef } from "react";

/**
 * @param value - The value to store
 * @returns - The previous value
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    if (value) {
      ref.current = value;
    }
  }, [value]);

  return ref.current;
}
