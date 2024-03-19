"use client";

import {
  default as React,
  createContext as createReactContext,
  useContext,
} from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This can literally be any.
const contextCache = new Map<string, React.Context<any>>();

/**
 * Retrieves the cached context or creates a new one if it doesn't exist.
 * @param key - Key in which to store the context in the cache. This should be unique to the context.
 * @returns The cached context.
 */
function getCachedContext<T extends object>(
  key: string,
): React.Context<T | null> {
  if (!contextCache.has(key)) {
    contextCache.set(key, createReactContext<T | null>(null));
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- We just created the context if it didn't exist, so this should always be defined.
  return contextCache.get(key)!;
}

/**
 * Creates a context and its corresponding Provider component.
 * @param key - Key in which to store the context in the cache. This should be unique to the context.
 * @returns A tuple containing the Provider and the hook to use the context.
 */
export function createContext<T extends object>(
  key: string,
): [React.FC<{ value: T; children: React.ReactNode }>, () => T] {
  const CachedContext = getCachedContext<T>(key);

  /**
   * Provider component for the created context.
   * @param value - The value to be provided by the context.
   * @param children - The child components that will have access to the context.
   */
  const Provider: React.FC<{ value: T; children: React.ReactNode }> = ({
    value,
    children,
  }) => (
    <CachedContext.Provider value={value}>{children}</CachedContext.Provider>
  );

  /**
   * Hook to access the value of the context.
   * @returns The value of the context.
   * @throws An error if the hook is used outside of the corresponding Provider component.
   */
  const useCachedContext = (): T => {
    const context = useContext(CachedContext);

    if (context === null) {
      throw new Error(
        `useCachedContext must be used within a ${key} Provider.`,
      );
    }
    return context;
  };

  return [Provider, useCachedContext];
}
