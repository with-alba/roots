import { useState } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { debounce } from "../utils/debounce";

/**
 *
 * @param query - The media query to evaluate
 * @returns - A boolean indicating whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useIsomorphicLayoutEffect(() => {
    // Function to evaluate the media query
    const evaluateMediaQuery = () => {
      if (typeof window !== "undefined") {
        const mediaQueryList = window.matchMedia(query);
        setMatches(mediaQueryList.matches);
      }
    };

    // Debounced version of our evaluateMediaQuery function
    const debouncedEvaluateMediaQuery = debounce(evaluateMediaQuery, 250);

    // Initially evaluate the media query
    evaluateMediaQuery();

    // Add resize event listener to window with debounced function
    window.addEventListener("resize", debouncedEvaluateMediaQuery);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", debouncedEvaluateMediaQuery);
    };
  }, [query]);

  return matches;
}
