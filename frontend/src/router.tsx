import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { z } from "zod";

export const router = createRouter({
  routeTree,
  context: {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    auth: undefined!,
  },
});

const routePaths = Object.keys(router.routesByPath) as [string, ...string[]];
export const RoutesEnum = z.enum(routePaths);

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
