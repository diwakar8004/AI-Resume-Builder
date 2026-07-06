import { z } from 'zod';

export function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export function parseRequestBody<T>(reqBody: unknown, schema: z.ZodSchema<T>): T {
  return schema.parse(reqBody);
}
