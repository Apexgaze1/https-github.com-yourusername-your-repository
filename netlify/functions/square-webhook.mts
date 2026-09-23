import type { Config } from "@netlify/functions";

const allowList: Record<string,{name:string,cj:string,variant:string,qty:number}> = {
 "NHG-TEC-001":{name:"Double-Layer Tech Organizer",cj:"CJGJ1734054-Gray",variant:"Gray",qty:1},
 "NHG-UTR-003":{name:"Silicone Utensil Rest",cj:"CJYD198735501AZ",variant:"Red Turner Frame / 1PCS",qty:1},
 "NHG-RFO-011":{name:"Refrigerator / Freezer Organizer",cj:"CJYD208536601AZ",variant:"White / 1PCS",qty:1},
 "NHG-SNK-012":{name:"Kitchen Sink Organizer",cj:"CJYD207339601AZ",variant:"Upgraded Black Left",qty:1},
 "NHG-VSL-013":{name:"Multifunction Vegetable Slicer",cj:"CJJT169443501AZ",variant:"Green and white",qty:1}
};

function safeEqual(a:string,b:string){if(a.length!==b.length)return false;let x=0;for(let i=0;i<a.length;i++)x|=a.charCodeAt(i)^b.charCodeAt(i);return x===0}

export default async (req:Request) => {
 if(req.method!=="POST") return new Response("Method Not Allowed",{status:405});
 const signature=req.headers.get("x-square-hmacsha256-signature")||"";
 const key=Netlify.env.get("SQUARE_WEBHOOK_SIGNATURE_KEY")||"";
 const notificationUrl=Netlify.env.get("SQUARE_WEBHOOK_NOTIFICATION_URL")||"";
 if(!key||!notificationUrl) return Response.json({accepted:false,error:"square_webhook_not_configured"},{status:503});
 const body=await req.text();
 const bytes=new TextEncoder().encode(notificationUrl+body);
 const cryptoKey=await crypto.subtle.importKey("raw",new TextEncoder().encode(key),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
 const digest=await crypto.subtle.sign("HMAC",cryptoKey,bytes);
 const expected=btoa(String.fromCharCode(...new Uint8Array(digest)));
 if(!safeEqual(signature,expected)) return Response.json({accepted:false,error:"invalid_signature"},{status:403});
 let event:any; try{event=JSON.parse(body)}catch{return Response.json({accepted:false,error:"invalid_json"},{status:400})}
 const eventId=event?.event_id||event?.id||null;
 const type=event?.type||null;
 return Response.json({accepted:true,eventId,type,mode:"validated-ingress",fulfillment:"not_submitted_until_order_mapping_is_proven"});
};

export const config: Config={path:"/api/square-webhook"};
