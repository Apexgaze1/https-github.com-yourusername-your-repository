import type { Config } from "@netlify/functions";

const required = ["SQUARE_ACCESS_TOKEN","SQUARE_LOCATION_ID","SQUARE_WEBHOOK_SIGNATURE_KEY","CJ_ACCESS_TOKEN"];

export default async () => {
  const checks = Object.fromEntries(required.map(k => [k, Boolean(Netlify.env.get(k))]));
  const ready = Object.values(checks).every(Boolean);
  return Response.json({
    ready,
    service: "neatharbor-backend",
    checks,
    note: "Boolean configuration presence only; no secrets are returned.",
    timestamp: new Date().toISOString()
  }, { status: ready ? 200 : 503 });
};

export const config: Config = { path: "/api/readiness" };
