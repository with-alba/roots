import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import {
  mercadoLibrePropertiesParser,
  mercadoLibrePropertyParser,
} from "./parsers/mercadoLibreParser/mercadoLibreParser";
import { propertiesFilters } from "./schema";

/* ---------------- Router ---------------- */

export const propertiesRouter = createTRPCRouter({
  getProperties: publicProcedure
    .input(propertiesFilters)
    .query(async ({ input }) => {
      const results = await mercadoLibrePropertiesParser({ input });

      return results;
    }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await mercadoLibrePropertyParser({ input });

      return result;
    }),
});
