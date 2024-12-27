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
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { Logo } from "../brand/logo";
import { User } from "../user/user";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

const pages = [
  {
    title: "Home",
    url: "/app/home",
    icon: Home,
  },
];

const campaigns = [
  {
    title: "Christmas 2024",
    url: "/app/campaigns/1",
  },
  {
    title: "Birtday 2024",
    url: "/app/campaigns/2",
  },
];

const campaignSubPages = [
  {
    id: "overview",
    title: "Overview"
  },
  {
    id: "metrics",
    title: "Metrics"
  },
  {
    id: "settings",
    title: "Settings"
  }
]

export default function AppSidebar() {
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
        <SidebarGroup>
          <SidebarGroupLabel>Campaigns</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {campaigns.map((campaign) => (
                <Collapsible key={campaign.url} className="group/collapsible">
                  <SidebarMenuItem key={campaign.url}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton size="lg" asChild>
                        <span>{campaign.title}</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {campaignSubPages.map((subPage) => (
                          <SidebarMenuSubItem key={subPage.id}>
                            <SidebarMenuButton size="lg" asChild>
                              <Link to={`${campaign.url}/${subPage.id}`}>
                                <span>{subPage.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
