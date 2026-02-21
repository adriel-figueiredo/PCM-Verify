import "./constants.js";
import { validateEnv } from "@constatic/base";
import { z } from "zod";

export const env = await validateEnv(z.looseObject({
    BOT_TOKEN: z.string("Discord Bot Token is required").min(1),
    MAIN_SERVER: z.string().min(1),
    MAIN_VERIFY: z.string().min(1),
    DATABASE_KEY: z.string().min(1),
<<<<<<< HEAD
    DATABASE_URL: z.url(),
=======
    DATABASE_URL: z.url().optional(),
>>>>>>> 4c79161ac2eb8af24dc5450744c05e7dd3ddf35a
    WEBHOOK_LOGS_URL: z.url().optional(),
    SERVER_PORT: z.coerce.number().min(1).optional()
}));