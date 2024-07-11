import dotenv from "dotenv";
import { z } from 'zod';

dotenv.config();

export const envSchema = z.object({
    DATABASE_URL: z.string(),
    AUTH_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);