import type { Config } from "@netlify/functions";

const required=[
 "SQUARE_ACCESS_TOKEN",
 "SQUARE_LOCATION_ID",
 "SQUARE_WEBHOOK_SIGNATURE_KEY",
 "SQUARE_WEBHOOK_NOTIFICATION_URL",
 "CJ_ACCESS_TOKEN"
];

export default async () => {
 const configuration=Object.fromEntries(required.map(k=>[k,Boolean(Netlify.env.get(k))]));
 const configured=Object.values(configuration).every(Boolean);
 return Response.json({
   service:"neatharbor-commerce",
   configured,
   configuration,
   safeguards:{
     exactCatalogAllowList:true,
     webhookSignatureValidation:true,
     durableEventState:true,
     duplicateEventProtection:true,
     failClosed:true,
     automaticSupplierPurchasing:false
   },
   next: configured ? "provider-validation" : "configure-missing-provider-secrets",
   timestamp:new Date().toISOString()
 },{status:configured?200:503});
};
export const config:Config={path:"/api/commerce-status"};
