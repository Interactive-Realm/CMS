import { fetchCampaigns } from "@/api/campaigns";
import DashboardLayout from "@/components/layouts/dashboard";
import { useTheme } from "@/components/utils/theme-provider";
import { addCommands, addCommandsRecord, removeCommands, removeCommandsRecord } from "@/stores/commandPaletteStore";
import type { Command } from "@/types/commandPaletteTypes";
import { THEMES } from "@/types/settingsTypes";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
  loader: async () => {
    return {
      campaigns: await fetchCampaigns()
    }
  },
  beforeLoad: ({ context, location }) => {
    const { isAuthenticated } = context.auth;
    if (!isAuthenticated) {
      // throw redirect({
      //   to: '/login',
      //   search: {
      //     redirect: location.href,
      //   },
      // })
    }
  },
  notFoundComponent: () => <div>404</div>,
});

function RouteComponent() {
  const { campaigns } = Route.useLoaderData();
  const { setTheme } = useTheme();

  const commands = useMemo(() => {
    const commands: Record<string, Command[]> = {};

    commands.default = [];
    commands.theme = [];

    commands.default.push({
      type: "goto",
      title: "Go to Home",
      icon: "home",
      to: "/app/home"
    });
    commands.default.push({
      type: "goto",
      title: "Go to Campaigns",
      icon: "home",
      to: "/app/campaigns"
    });
    commands.default.push({
      type: "goto",
      title: "Go to Settings",
      icon: "settings",
      to: "/app/settings"
    });
    commands.default.push({
      type: "goto",
      title: "Sign Out",
      icon: "settings",
      to: "/auth/logout"
    });

    for (const campaign of campaigns) {
      commands.default.push({
        type: "goto",
        title: `Go to ${campaign.title}`,
        to: `/app/campaigns/${campaign.id}/overview`,
      });
      commands.default.push({
        type: "goto",
        title: `Go to ${campaign.title} Metrics`,
        to: `/app/campaigns/${campaign.id}/metrics`,
      });
    };

    // Theme
    commands.default.push({
      type: "submenu",
      title: "Change Theme",
      icon: "settings",
      submenu: "theme",
      message: "Select color mode"
    });

    for (const mode of THEMES) {
      commands.theme.push({
        type: "callback",
        title: mode.charAt(0).toUpperCase() + mode.slice(1),
        callback: () => setTheme(mode)
      });
    };

    return commands;
  }, [campaigns, setTheme]);

  useEffect(() => {
    addCommandsRecord(commands);
    return () => removeCommandsRecord(commands);
  }, [commands])

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}