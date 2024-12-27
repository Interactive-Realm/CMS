import { fetchCampaign, fetchCampaignMetrics } from '@/api/campaigns'
import { PlaysChart } from '@/components/plays-chart'
import { Section } from '@/components/ui/section'
import { updateRouteMetadata } from '@/stores/routeStore'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/app/campaign/$campaignId/users')({
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
      title: 'Users',
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
          title: 'Users',
          to: `/app/campaign/${campaign.id}/users`,
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
