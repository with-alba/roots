import "server-only"; // Make sure you can't import this on client

import { appRouter } from "~/server/api/root";

//@ts-expect-error -- Don't need the headers
export const api = appRouter.createCaller({});
