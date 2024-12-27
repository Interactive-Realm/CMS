import { Logo } from "@/components/brand/logo";
import { ResetPasswordForm } from "@/components/forms/reset-password-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/resetpassword")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Logo />
        <ResetPasswordForm redirect="/auth/login" />
      </div>
    </div>
  );
}
