import type { Config } from "@netlify/functions";
import { claimEvent } from "./_shared/order-state.mts";

export default async ()=>{
 const token=Netlify.env.get("SQUARE_ACCESS_TOKEN");
 if(!token) return Response.json({ok:false,error:"square_not_configured"},{status:503});
 const res=await fetch("https://connect.squareup.com/v2/events",{
  method:"POST",
  headers:{"Authorization":`Bearer ${token}`,"Square-Version":"2026-09-16","Content-Type":"application/json"},
  body:JSON.stringify({limit:100,query:{filter:{event_types:["payment.created","payment.updated","order.created","order.updated"]},sort:{field:"CREATED_AT",order:"ASC"}}})
 });
 const data:any=await res.json();
 if(!res.ok) return Response.json({ok:false,provider:"square",status:res.status,errors:data?.errors||[]},{status:502});
 let accepted=0,duplicates=0;
 for(const event of data?.events||[]){
  const id=event?.id||event?.event_id; if(!id) continue;
  const c=await claimEvent(id,{type:event?.type||null,source:"square-events-reconciliation"});
  c.duplicate?duplicates++:accepted++;
 }
 return Response.json({ok:true,source:"square-events-api",accepted,duplicates,cursor:data?.cursor||null});
};
export const config:Config={path:"/api/reconcile/square"};
