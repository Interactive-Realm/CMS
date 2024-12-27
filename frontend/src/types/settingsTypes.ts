import { z } from "zod";

export const THEMES = ["system", "dark", "light"] as const;

export const ThemeEnum = z.enum(THEMES);

export type Theme = z.infer<typeof ThemeEnum>;
