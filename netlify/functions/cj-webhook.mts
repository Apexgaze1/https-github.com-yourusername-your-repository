import type { Config } from "@netlify/functions";
import { claimEvent } from "./_shared/order-state.mts";
function equal(a:string,b:string){if(a.length!==b.length)return false;let x=0;for(let i=0;i<a.length;i++)x|=a.charCodeAt(i)^b.charCodeAt(i);return x===0}
export default async(req:Request)=>{
 if(req.method!=="POST") return new Response("Method Not Allowed",{status:405});
 const openId=Netlify.env.get("CJ_OPEN_ID")||"";
 if(!openId) return Response.json({code:503,result:"error",message:"cj_webhook_not_configured"},{status:503});
 const raw=await req.text(),sign=req.headers.get("sign")||"";
 const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(openId),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
 const bytes=await crypto.subtle.sign("HMAC",key,new TextEncoder().encode(raw));
 const expected=btoa(String.fromCharCode(...new Uint8Array(bytes)));
 if(!equal(sign,expected)) return Response.json({code:401,result:"error",message:"invalid_signature"},{status:401});
 let event:any;try{event=JSON.parse(raw)}catch{return Response.json({code:400,result:"error",message:"invalid_json"},{status:400})}
 const id=event?.messageId;if(!id)return Response.json({code:400,result:"error",message:"missing_message_id"},{status:400});
 const claimed=await claimEvent("cj-"+id,{type:event?.type||null,messageType:event?.messageType||null,source:"cj-webhook"});
 return Response.json({code:200,result:"success",message:claimed.duplicate?"duplicate":"ok"});
};
export const config:Config={path:"/api/cj-webhook"};
