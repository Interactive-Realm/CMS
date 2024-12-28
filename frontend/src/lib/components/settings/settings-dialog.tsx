import { type DialogProps, DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ThemeToggle } from "../utils/theme-toggle";
import { SettingsTitle } from "./settings-title";

interface SettingsDialog extends DialogProps {}

export function SettingsDialog({ ...props }: SettingsDialog) {
  return (
    <Dialog {...props}>
      <DialogContent
        variant="screen"
        className="flex flex-col overflow-y-scroll"
      >
        <DialogHeader className="border-b pb-6">
          <DialogTitle className="text-2xl font-bold tracking-tight mb-2">
            Settings
          </DialogTitle>
          <DialogDescription>
            Manage your account settings and set e-mail preferences.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="account">
          <div className="flex flex-col gap-y-8 md:flex-row md:gap-x-8 lg:gap-x-12 md:gap-y-0">
            <aside className="md:w-1/4 lg:w-1/5">
              <TabsList orientation="vertical">
                <TabsTrigger orientation="vertical" value="account">
                  Account
                </TabsTrigger>
                <TabsTrigger orientation="vertical" value="appearence">
                  Appearence
                </TabsTrigger>
                <TabsTrigger orientation="vertical" value="notifications">
                  Notifications
                </TabsTrigger>
              </TabsList>
            </aside>
            <div className="flex-1 md:max-w-xl lg:max-w-2xl">
              <TabsContent value="account">
                <SettingsTitle
                  title="Account"
                  description="Update your account settings."
                />
              </TabsContent>
              <TabsContent value="appearence">
                <SettingsTitle
                  title="Appearence"
                  description="Customize the appearance of the app."
                />
                <ThemeToggle />
              </TabsContent>
              <TabsContent value="notifications">
                <SettingsTitle
                  title="Notifications"
                  description="Configure how you receive notifications."
                />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
