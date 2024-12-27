import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link, redirect } from "@tanstack/react-router";
import { Home, Layers } from "lucide-react";
import { User } from "../user/user";
import { Separator } from "@radix-ui/react-separator";

const pages = [
  {
    title: "Main Dashboard",
    url: "/home",
    icon: Home,
  }
]

const campaigns = [
    {
        title: "Christmas 2024",
        url: "#",
    },
    {
        title: "Birtday 2024",
        url: "#",
    }
]

export default function AppSidebar() {
    const goHome = async () => {
        await redirect({
            to: "/home"
        })
    }

    return (
        <Sidebar className="border-none p-5 pr-0" variant="floating">
            <SidebarHeader className="pt-4 flex items-center justify-center h-16 sm:h-20 md:h-[6rem]">
                <SidebarMenu>
                    <SidebarMenuItem className="m-2 flex gap-3 items-center justify-center">
                        <Layers size="2rem" />
                        <p className="font-bold md:text-2xl">Mekado</p>
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
                            <SidebarMenuButton asChild>
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
                        {campaigns.map((item) => (
                            <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link to={item.url}>
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                       <User user={{ avatar: "", email: "alice@domain.dk", name: "Alice" }} variant="sidebar" />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}