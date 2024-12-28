import type { Campaign } from "@/lib/types/dataTypes";
import type { CampaignGraphMetricEntry } from "@/lib/types/metricTypes";

export async function fetchCampaigns(): Promise<Campaign[]> {
  return [
    {
      id: "1",
      title: "Birtday 2024",
      game: {
        title: "Birthday Roulette 2024",
      },
    },
  ];
}

export async function fetchCampaign(_id: string): Promise<Campaign> {
  return {
    id: "1",
    title: "Birtday 2024",
    game: {
      title: "Birthday Roulette 2024",
    },
  };
}

export async function fetchCampaignMetrics(
  _id: string,
): Promise<CampaignGraphMetricEntry[]> {
  return [
    { date: "01/01/2024", value: 200 },
    { date: "02/01/2024", value: 400 },
    { date: "03/01/2024", value: 100 },
    { date: "04/01/2024", value: 150 },
    { date: "05/01/2024", value: 500 },
    { date: "06/01/2024", value: 233 },
    { date: "07/01/2024", value: 483 },
    { date: "08/01/2024", value: 200 },
    { date: "09/01/2024", value: 300 },
    { date: "09/01/2024", value: 300 },
    { date: "09/01/2024", value: 300 },
    { date: "09/01/2024", value: 300 },
    { date: "09/01/2024", value: 300 },
    { date: "09/01/2024", value: 300 },
    { date: "09/01/2024", value: 300 },
    { date: "09/01/2024", value: 300 },
  ];
}
