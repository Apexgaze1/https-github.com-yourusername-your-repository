import type { Config } from "@netlify/functions";

type Route={name:string,available:boolean,purpose:string};
export default async ()=>{
 const square=Boolean(Netlify.env.get("SQUARE_ACCESS_TOKEN"));
 const cj=Boolean(Netlify.env.get("CJ_ACCESS_TOKEN"));
 const routes:Route[]=[
  {name:"square-webhook",available:square,purpose:"primary signed Square event intake"},
  {name:"square-reconciliation",available:square,purpose:"recover provider events/orders missed by webhook"},
  {name:"cj-api",available:cj,purpose:"primary CJ fulfillment provider interface"},
  {name:"cj-reconciliation",available:cj,purpose:"recover supplier status/tracking when callbacks fail"},
  {name:"manual-review",available:true,purpose:"safe holding route for ambiguous/unmapped orders"},
  {name:"durable-replay",available:true,purpose:"replay persisted failed events without duplicating supplier orders"}
 ];
 return Response.json({
  ok:true,
  policy:"authorized-routes-only",
  credentialBypass:false,
  routes,
  automaticSupplierPurchasing:false,
  timestamp:new Date().toISOString()
 });
};
export const config:Config={path:"/api/routes"};
