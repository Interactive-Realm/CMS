import LoginForm from "@/components/forms/LoginForm";
import { createFileRoute, redirect } from "@tanstack/react-router";

type LoginSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): LoginSearch => {
    return {
      redirect: (search.redirect as string) || "/home",
    };
  },
  beforeLoad: ({ context, search }) => {
    const { isAuthenticated } = context.auth;

    if (isAuthenticated) {
      // throw redirect({
      //   to: search.redirect,
      // })
    }
  },
});

function RouteComponent() {
  return <LoginForm />;
}
