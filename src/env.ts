import "./constants.js";
import { validateEnv } from "@constatic/base";
import { z } from "zod";

export const env = await validateEnv(z.looseObject({
    BOT_TOKEN: z.string("Discord Bot Token is required").min(1),
    DATABASE_KEY: z.string().min(1),
    DATABASE_URL: z.url().optional(),
    WEBHOOK_LOGS_URL: z.url().optional(),
    SERVER_PORT: z.coerce.number().min(1).optional()
}));