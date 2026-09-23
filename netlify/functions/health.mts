import type { Config } from "@netlify/functions";

export default async () => Response.json({
  ok: true,
  service: "neatharbor-backend",
  platform: "netlify",
  timestamp: new Date().toISOString()
});

export const config: Config = { path: "/api/health" };
