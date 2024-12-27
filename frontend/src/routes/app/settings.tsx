import { updateRouteMetadata } from "@/stores/routeStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/app/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    updateRouteMetadata({
      title: "Settings",
      description: "Platform settings.",
      breadcrumbs: [
        {
          title: "Home",
          to: "/app/home",
        },
        {
          title: "Settings",
          to: "/app/settings",
        },
      ],
    });
  }, []);

  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
}
