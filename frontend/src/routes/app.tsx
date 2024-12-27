import DashboardLayout from "@/components/layouts/dashboard";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: () => (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
  beforeLoad: ({ context, location }) => {
    const { isAuthenticated } = context.auth;
    if (!isAuthenticated) {
      // throw redirect({
      //   to: '/login',
      //   search: {
      //     redirect: location.href,
      //   },
      // })
    }
  },
  notFoundComponent: () => <div>Hey</div>,
});
