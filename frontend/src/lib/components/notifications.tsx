import type { Notification } from "@/lib/types/notificationTypes";
import { cn } from "@/lib/utils/shadcn";
import { Bell } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { NotificationBadge } from "./ui/notification-badge";

interface NotificationsProps {
  className?: string;
}

export function Notifications({ className }: NotificationsProps) {
  const newNotifications = true;
  const notifications: Notification[] = [
    {
      id: "1",
      title: "New Features",
      message:
        "This is NOT a component library. It's a collection of re-usable components that you can copy and paste into your apps.  What do you mean by not a component library?  I mean you do not install it as a dependency. It is not available or distributed via npm.  Pick the components you need. Copy and paste the code into your project and customize to your needs. The code is yours.  Use this as a reference to build your own component libraries.",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("rounded-full relative", className)}
        >
          <Bell />
          <NotificationBadge visible={newNotifications} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] w-full max-w-80 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          {notifications.length === 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem>No notifications.</DropdownMenuItem>
            </>
          )}
          {notifications.map((notification) => (
            <Fragment key={notification.id}>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex-col items-start"
                onClick={() => {
                  console.log("HEY");
                }}
              >
                <p className="font-semibold">{notification.title}</p>
                <p>{notification.message}</p>
              </DropdownMenuItem>
            </Fragment>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
