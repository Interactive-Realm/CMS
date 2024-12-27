import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/logout')({
  beforeLoad: () => {
    throw redirect({
      to: "/auth/login",
    });
  },
})
