import { z } from "zod";

export const GameSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});
export type Game = z.infer<typeof GameSchema>;

export const CampaignSchema = z.object({
  id: z.string(),
  baseUrl: z.string(),
  title: z.string(),
  description: z.string().optional(),
  game: GameSchema,
});
export type Campaign = z.infer<typeof CampaignSchema>;

export const OrganizationSchema = z.object({
  name: z.string(),
});
export type Organization = z.infer<typeof OrganizationSchema>;

export const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
  avatar: z.string().optional(),
});
export type User = z.infer<typeof UserSchema>;
