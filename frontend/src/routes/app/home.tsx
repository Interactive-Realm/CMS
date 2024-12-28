import { updateRouteMetadata } from "@/lib/stores/routeStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/app/home")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    updateRouteMetadata({
      title: "Home",
      description: "",
      breadcrumbs: [
        {
          title: "Home",
          to: "/app/home",
        },
      ],
    });
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
