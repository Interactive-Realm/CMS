import { fetchCampaigns } from "@/api/campaigns";
import { updateRouteMetadata } from "@/stores/routeStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/app/campaigns/")({
  loader: async () => await fetchCampaigns(),
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    updateRouteMetadata({
      title: "Campaigns",
      description: "",
      breadcrumbs: [
        {
          title: "Campaigns",
          to: "/app/campaigns",
        },
      ],
    });
  }, []);

  return (
    <div>
      <h1>Campaigns</h1>
    </div>
  );
}
