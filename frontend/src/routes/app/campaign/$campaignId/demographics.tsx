import { fetchCampaign, fetchCampaignMetrics } from '@/lib/api/campaigns'
import { PlaysChart } from '@/lib/components/plays-chart'
import { Section } from '@/lib/components/ui/section'
import { updateRouteMetadata } from '@/lib/stores/routeStore'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/app/campaign/$campaignId/demographics')({
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
  const { campaign, metrics } = Route.useLoaderData()

  useEffect(() => {
    updateRouteMetadata({
      title: 'Demographics',
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
        {
          title: 'Demographics',
          to: `/app/campaign/${campaign.id}/demographics`,
        },
      ],
    })
  }, [campaign])

  return (
    <>
      <Section>
        <PlaysChart data={metrics} className="max-h-[500px]" />
      </Section>
    </>
  )
}
