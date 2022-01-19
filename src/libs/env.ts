import { Env } from "env";

export const env = new Env();

export const isDevelopment = env.get("DENO_ENV") === "development";
export const isProduction = env.get("DENO_ENV") === "production";
export const isTest = env.get("DENO_ENV") === "test";
