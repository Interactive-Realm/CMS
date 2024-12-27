import { Logo } from "@/components/brand/logo";
import { LoginForm } from "@/components/forms/login-form";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const LoginSearchSchema = z.object({
  redirect: fallback(z.string(), "/app/home").default("/app/home"),
});

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
  validateSearch: zodValidator(LoginSearchSchema),
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
  const { redirect } = useSearch({ from: "/auth/login" });
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Logo />
        <LoginForm redirect={redirect} />
      </div>
    </div>
  );
}
