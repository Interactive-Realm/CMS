import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/lib/components/ui/sidebar";
import type { Campaign } from "@/lib/types/dataTypes";
import { Link } from "@tanstack/react-router";
import {
  Binoculars,
  ChartNoAxesColumn,
  ChartPie,
  Download,
  Home,
  List,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "../brand/logo";
import { User } from "../user/user";

const pages = [
  {
    title: "Home",
    url: "/app/home",
    icon: Home,
  },
  {
    title: "Campaigns",
    url: "/app/campaigns",
    icon: List,
  },
];

const campaigns: Campaign[] = [
  {
    id: "1",
    title: "Christmas 2024",
    baseUrl: "/app/campaign/1",
    description: "Christmas is here.",
    game: {
      title: "Balloon Pop",
    },
  },
];

const campaignSubPages = [
  {
    id: "overview",
    title: "Overview",
    icon: Binoculars,
  },
  {
    id: "traffic",
    title: "Traffic",
    icon: ChartNoAxesColumn,
  },
  {
    id: "demographics",
    title: "Demographics",
    icon: ChartPie,
  },
  {
    id: "users",
    title: "Users",
    icon: Users,
  },
  {
    id: "rewards",
    title: "Rewards",
    icon: Trophy,
  },
  {
    id: "export",
    title: "Export",
    icon: Download,
  },
];

export default function AppSidebar() {
  const [selectedCampaignIndex, setSelectedCampaignIndex] = useState(0);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );

  useEffect(() => {
    setSelectedCampaign(campaigns[selectedCampaignIndex]);
  }, [selectedCampaignIndex]);

  return (
    <Sidebar className="border-none p-5 pr-0" variant="floating">
      <SidebarHeader className="pt-4 flex items-center justify-center h-16 sm:h-20 mx-4 md:h-[6rem] border-b">
        <SidebarMenu>
          <SidebarMenuItem className="m-4 flex gap-3 items-center justify-center">
            <Link to="/app/home">
              <Logo size="lg" />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pages.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton size="lg" asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {selectedCampaign && (
          <SidebarGroup>
            <SidebarGroupLabel>{selectedCampaign?.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {campaignSubPages.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton size="lg" asChild>
                      <Link to={`${selectedCampaign.baseUrl}/${item.id}`}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <User
              user={{ avatar: "", email: "alice@domain.dk", name: "Alice" }}
              variant="sidebar"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
