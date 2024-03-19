"use client";

import { z } from "zod";
import { createSearchParamsContext } from "~/lib/utils";
import { propertiesFilters } from "~/server/api/routers/properties/schema";

// Extend the propertiesFilters schema to include the page and view query parameters
const searchParamsSchema = propertiesFilters.extend({
  page: z.number().optional(),
  view: z.enum(["list", "map"]).optional(),
});

// Infer the type of the search page query parameters
export type SearchPageSearchParams = z.infer<typeof searchParamsSchema>;

// Create the search page query parameters context
export const [SearchPageSearchParamsProvider, useSearchPageSearchParams] =
  createSearchParamsContext({ schema: searchParamsSchema });
