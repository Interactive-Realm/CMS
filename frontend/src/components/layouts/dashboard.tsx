import AppHeader from "@/components/app/app-header";
import AppSidebar from "@/components/app/app-sidebar";
import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader title="Home" className="md:mt-5" />
        <main id="main" className="flex flex-1 flex-col gap-4 px-6">
          <div className="flex-1 rounded-xl md:min-h-min">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
