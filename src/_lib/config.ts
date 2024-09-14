import { z } from "zod";

export const configSchema = z.object({
    // Database
    POSTGRES_PRISMA_URL: z
        .string({ required_error: "POSTGRES_PRISMA_URL is required." })
        .min(1, "POSTGRES_PRISMA_URL is required."),
    POSTGRES_URL_NON_POOLING: z
        .string({ required_error: "POSTGRES_URL_NON_POOLING is required." })
        .min(1, "POSTGRES_URL_NON_POOLING is required."),

    // Auth
    AUTH_SECRET: z
        .string({ required_error: "AUTH_SECRET is required." })
        .min(1, "AUTH_SECRET is required.")
});

const config = configSchema.parse(process.env)
export default config