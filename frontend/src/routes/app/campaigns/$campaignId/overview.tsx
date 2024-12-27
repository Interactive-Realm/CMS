import { fetchCampaign, fetchCampaignMetrics } from "@/api/campaigns";
import { PlaysChart } from "@/components/plays-chart";
import { Section } from "@/components/ui/section";
import { updateRouteMetadata } from "@/stores/routeStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/app/campaigns/$campaignId/overview")({
  loader: async ({ params }) => {
    const campaignId = params.campaignId;
    const [campaign, metrics] = await Promise.all([
      await fetchCampaign(campaignId),
      await fetchCampaignMetrics(campaignId),
    ]);

    return {
      campaign,
      metrics,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { campaign } = Route.useLoaderData();

  useEffect(() => {
    updateRouteMetadata({
      title: campaign.title,
      description: "",
      breadcrumbs: [
        {
          title: "Campaigns",
          to: "/app/campaigns",
        },
        {
          title: campaign.title,
          to: `/app/campaigns/${campaign.id}/overview`,
        },
      ],
    });
  }, [campaign]);

  return (
    <>
      <h1>Index</h1>
    </>
  );
}
