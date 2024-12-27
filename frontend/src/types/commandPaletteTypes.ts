import { RoutesEnum } from "@/router";
import { z } from "zod";

const BaseCommandSchema = z.object({
  title: z.string(),
  icon: z.string().optional(),
});

export const GotoCommandSchema = BaseCommandSchema.extend({
  type: z.literal("goto"),
  to: RoutesEnum
});

export const CallbackCommandSchema = BaseCommandSchema.extend({
  type: z.literal("callback"),
  callback: z.function()
});

export const SubMenuCommandSchema = BaseCommandSchema.extend({
  type: z.literal("submenu"),
  message: z.string(),
  submenu: z.string()
});

export const CommandSchema = z.discriminatedUnion("type", [
  GotoCommandSchema,
  CallbackCommandSchema,
  SubMenuCommandSchema
]);

export type Command = z.infer<typeof CommandSchema>;
