"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useMemo } from "react";
import type { z } from "zod";

interface CreateSearchParamsContextArgs<T extends z.ZodType> {
  schema: T;
}

/**
 * Parses the search params to handle arrays and objects.
 * @returns The parsed search params.
 */
const parseParams = <T extends object>(params: Record<keyof T, string>) => {
  const query = { ...params };

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") {
      try {
        // Attempt to parse arrays and objects
        const parsedValue = JSON.parse(value);
        query[key as keyof T] = parsedValue;
      } catch {
        // If it fails, keep the original value
      }
    }
  });

  return query as T;
};

/**
 * Creates a context and its corresponding Provider component to manage search params.
 * NextJS doesn't provide a type-safe way to manage search params, so this context is used to provide a type-safe way to manage them.
 * @returns A tuple containing the Provider and the hook to use the context.
 */
export function createSearchParamsContext<T extends z.ZodType>({
  schema,
}: CreateSearchParamsContextArgs<T>) {
  // Infer the type from the schema
  type SearchParamsContextType = z.infer<T>;
  // Create the context
  const SearchParamsContext = createContext<SearchParamsContextType | null>(
    null,
  );

  /**
   * Hook to access the search params and set them.
   * @returns The search params, the function to set them and a stringified version of the search params.
   * @throws An error if the hook is used outside of the corresponding Provider component or if the search params don't match the schema.
   */
  function useSearchParams() {
    const router = useRouter();
    // Get the context
    const context = useContext(SearchParamsContext);

    // Throw an error if the context is not provided
    if (!context) {
      throw new Error(
        "useSearchParams must be used within a <SearchParamsProvider />",
      );
    }

    // Parse the search params. Throws an error if the search params don't match the schema.
    schema.parse(parseParams(context));

    /**
     * Sets the search params.
     * @param newParams - The new search params to set. Can be a partial object or a function that receives the previous search params and returns the new ones.
     */
    const setSearchParams = (
      newParams:
        | Partial<T>
        | ((
            prevParams: SearchParamsContextType,
          ) => Partial<SearchParamsContextType>),
    ) => {
      // Get the current search params
      const updatedParams =
        typeof newParams === "function" ? newParams(context) : newParams;

      // Create a new URLSearchParams object
      const newSearchParams = new URLSearchParams(
        updatedParams as Record<string, string>,
      );

      // Loop through the new search params and set them in the URLSearchParams object
      Object.keys(updatedParams).forEach((key) => {
        const value = updatedParams[key as keyof SearchParamsContextType];

        // Remove the key if the value is falsy
        if (!value) {
          newSearchParams.delete(key);
          return;
        }

        // Stringify objects
        if (typeof value === "object") {
          // Objects are JSON-stringified
          newSearchParams.set(key, JSON.stringify(value));
        } else {
          // Other types are directly set
          newSearchParams.set(key, value as string);
        }
      });

      // Create the new URL
      const newUrl = `?${newSearchParams.toString()}`;

      // Push the new URL to the router
      router.push(newUrl, {
        scroll: false,
      });
    };

    // Memoize the search params and the stringified version of them
    const searchParams: SearchParamsContextType = useMemo(() => {
      const params = parseParams<SearchParamsContextType>(context);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- Typescript tretats this as any because of Zod's type inference
      return params;
    }, [context]);

    // Stringify the search params
    const stringifiedSearchParams = (): Record<string, string> => {
      const params = { ...searchParams };

      Object.entries(params).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          // Objects are JSON-stringified
          params[key as keyof SearchParamsContextType] = JSON.stringify(value);
        }
      });

      return params as Record<string, string>;
    };

    return [searchParams, setSearchParams, stringifiedSearchParams] as const;
  }

  function SearchParamsProvider({
    children,
    value,
  }: {
    children: React.ReactNode;
    value: SearchParamsContextType;
  }) {
    return (
      <SearchParamsContext.Provider value={value}>
        {children}
      </SearchParamsContext.Provider>
    );
  }

  return [SearchParamsProvider, useSearchParams] as const;
}
