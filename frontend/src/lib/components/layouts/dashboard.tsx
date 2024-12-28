import AppHeader from "@/lib/components/app/app-header";
import AppSidebar from "@/lib/components/app/app-sidebar";
import type { ReactNode } from "react";
import { CommandPalette } from "../command-palette/command-palette";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader className="md:mt-3 md:mb-2" />
        <main id="main" className="flex flex-1 flex-col gap-4 px-6">
          <div className="flex-1 rounded-xl md:min-h-min flex flex-col gap-4">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
