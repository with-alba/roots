import "server-only";

import { createTRPCRouter } from "./trpc";
import { propertiesRouter } from "./routers/properties/properties";

export const appRouter = createTRPCRouter({
  properties: propertiesRouter,
});

export type AppRouter = typeof appRouter;
