import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { User2 } from "lucide-react";
import { Button } from "../ui/button";
import { AppBreadcrumbs } from "./app-breadcrumbs";
import { User } from "../user/user";

interface DashboardHeaderProps {
  title: string;
  className?: string;
}

export default function AppHeader({ title, className }: DashboardHeaderProps) {
  return (
    <header
      className={cn(
        "flex px-6 h-16 sm:h-20 md:h-[6rem] md:px-12 items-center justify-between transition-all",
        className,
      )}
    >
      <div className="flex flex-row-reverse md:flex-col gap-8 items-center md:gap-0 md:items-start">
        <AppBreadcrumbs className="hidden sm:block" />
        <p className="text-md shrink capitalize md:text-3xl font-bold">
          {title}
        </p>
      </div>
      <div className="flex gap-3 items-center">
        <SidebarTrigger className="rounded-full xl:hidden" />
        <User user={{ avatar: "", email: "alice@domain.dk", name: "Alice" }} />
      </div>
    </header>
  );
}
