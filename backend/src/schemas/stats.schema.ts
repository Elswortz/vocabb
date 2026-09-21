import { z } from "zod";

export const getActivityQuerySchema = z.object({
  days: z.coerce
    .number()
    .int("days must be an integer")
    .positive("days must be greater than 0")
    .max(365, "days must not exceed 365")
    .default(7),
});

export type GetActivityQuery = z.infer<typeof getActivityQuerySchema>;
