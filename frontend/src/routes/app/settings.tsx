import { Section } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateRouteMetadata } from "@/stores/routeStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/app/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    updateRouteMetadata({
      title: "Settings",
      description: "Platform settings.",
      breadcrumbs: [
        {
          title: "Home",
          to: "/app/home",
        },
        {
          title: "Settings",
          to: "/app/settings",
        },
      ],
    });
  }, []);

  return (
    <>
      <Section>
       
       
          
      </Section>
      <Section>
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:hidden">Settings</h2>
          <p>Manage your account settings and set e-mail preferences.</p>
        </div>
        <Separator className="my-6" />
        <Tabs defaultValue="account">
          <div className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-12 lg:gap-y-0">
            <aside className="lg:w-1/5">
              <TabsList className="flex gap-x-2 lg:flex-col lg:h-max lg:gap-x-0 lg:gap-y-1 lg:justify-start bg-transparent">
                <TabsTrigger value="profile" className="lg:w-full shadow-none lg:items-start lg:justify-start data-[state=active]:bg-muted">Profile</TabsTrigger>
                <TabsTrigger value="account" className="lg:w-full shadow-none lg:items-start lg:justify-start data-[state=active]:bg-muted">Account</TabsTrigger>
                <TabsTrigger value="appearence" className="lg:w-full shadow-none lg:items-start lg:justify-start data-[state=active]:bg-muted">Appearence</TabsTrigger>
                <TabsTrigger value="notifications" className="lg:w-full shadow-none lg:items-start lg:justify-start data-[state=active]:bg-muted">Notifications</TabsTrigger>
                <TabsTrigger value="display" className="lg:w-full shadow-none lg:items-start lg:justify-start data-[state=active]:bg-muted">Display</TabsTrigger>
              </TabsList>
            </aside>
            <div className="flex-1 lg:max-w-2xl">
              <TabsContent value="profile">
                <div>
                  <h3 className="text-lg font-medium">Profile</h3>
                  <p className="text-sm text-muted-foreground">Customize the appearance of the app. Automatically switch between day and night themes.</p>
                </div>
                <Separator />

              </TabsContent>
              <TabsContent value="account">

              </TabsContent>
              <TabsContent value="appearence">
                <div>
                  <h3 className="text-lg font-medium">Appearance</h3>
                  <p className="text-sm text-muted-foreground">Customize the appearance of the app. Automatically switch between day and night themes.</p>
                </div>
                <Separator />

              </TabsContent>
              <TabsContent value="notifications">

              </TabsContent>
              <TabsContent value="display">

              </TabsContent>
            </div>
          </div>
        </Tabs>
      </Section>
    </>
  );
}
