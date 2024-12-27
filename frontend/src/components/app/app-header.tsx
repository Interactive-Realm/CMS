import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useRouteMetadata } from "@/stores/routeStore";
import { User } from "../user/user";
import { AppBreadcrumbs } from "./app-breadcrumbs";
import { CommandPalette } from "../command-palette/command-palette";

interface DashboardHeaderProps {
  className?: string;
}

export default function AppHeader({ className }: DashboardHeaderProps) {
  const { title } = useRouteMetadata();

  return (
    <header
      className={cn(
        "flex px-6 h-16 sm:h-20 md:h-[6rem] md:px-14 items-center justify-between transition-all",
        className,
      )}
    >
      <div className="flex flex-row-reverse md:flex-col gap-6 items-center md:gap-0 md:items-start">
        <AppBreadcrumbs className="hidden sm:block md:mb-2" />
        <p className="text-md shrink capitalize md:text-3xl font-bold">
          {title}
        </p>
      </div>
      <div className="flex gap-3 items-center">
        <CommandPalette />
        <SidebarTrigger className="rounded-full xl:hidden" />
        <User user={{ avatar: "", email: "alice@domain.dk", name: "Alice" }} />
      </div>
    </header>
  );
}
