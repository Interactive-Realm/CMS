import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/lib/components/ui/chart";
import type { CampaignGraphMetricEntry } from "@/lib/types/metricTypes";
import { cn } from "@/lib/utils/shadcn";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  value: {
    label: "Plays",
    color: "#2563eb",
  },
} satisfies ChartConfig;

interface PlaysChartProps {
  data: CampaignGraphMetricEntry[];
  className?: string;
}

export function PlaysChart({ data, className }: PlaysChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className={cn("min-h-[200px] w-full", className)}
    >
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
