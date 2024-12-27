import type { AuthContextType } from "@/contexts/auth";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

interface RouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});
