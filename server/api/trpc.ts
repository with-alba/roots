import { initTRPC } from "@trpc/server";
import type { NextRequest } from "next/server";
import { transformer } from "~/lib/trpc/shared";

interface CreateContextOptions {
  headers: Headers;
}

export const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    headers: opts.headers,
  };
};

export const createTRPCContext = (opts: { req: NextRequest }) => {
  // Fetch stuff that depends on the request

  return createInnerTRPCContext({
    headers: opts.req.headers,
  });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
