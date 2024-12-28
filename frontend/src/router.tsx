import { createRouter } from "@tanstack/react-router";
import { z } from "zod";
import { routeTree } from "./routeTree.gen";

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
