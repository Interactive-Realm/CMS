import { fetchCampaign, fetchCampaignMetrics } from '@/lib/api/campaigns'
import { updateRouteMetadata } from '@/lib/stores/routeStore'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/app/campaign/$campaignId/overview')({
  loader: async ({ params }) => {
    const campaignId = params.campaignId
    const [campaign, metrics] = await Promise.all([
      await fetchCampaign(campaignId),
      await fetchCampaignMetrics(campaignId),
    ])

    return {
      campaign,
      metrics,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { campaign } = Route.useLoaderData()

  useEffect(() => {
    updateRouteMetadata({
      title: campaign.title,
      description: '',
      breadcrumbs: [
        {
          title: 'Campaigns',
          to: '/app/campaigns',
        },
        {
          title: campaign.title,
          to: `/app/campaign/${campaign.id}/overview`,
        },
      ],
    })
  }, [campaign])

  return (
    <>
      <h1>Index</h1>
    </>
  )
}
