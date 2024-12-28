import { z } from "zod";

export const NotificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  message: z.string(),
});

export type Notification = z.infer<typeof NotificationSchema>;
