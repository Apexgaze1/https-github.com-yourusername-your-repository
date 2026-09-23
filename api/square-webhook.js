import crypto from "node:crypto";
function safeEqual(a,b){const x=Buffer.from(a||"");const y=Buffer.from(b||"");return x.length===y.length&&crypto.timingSafeEqual(x,y)}
export default async function handler(req,res){
 if(req.method!=="POST") return res.status(405).json({accepted:false,error:"method_not_allowed"});
 const key=process.env.SQUARE_WEBHOOK_SIGNATURE_KEY||"";
 const notificationUrl=process.env.SQUARE_WEBHOOK_NOTIFICATION_URL||"";
 if(!key||!notificationUrl) return res.status(503).json({accepted:false,error:"square_webhook_not_configured"});
 const raw=typeof req.body==="string"?req.body:JSON.stringify(req.body??{});
 const expected=crypto.createHmac("sha256",key).update(notificationUrl+raw).digest("base64");
 const signature=req.headers["x-square-hmacsha256-signature"]||"";
 if(!safeEqual(String(signature),expected)) return res.status(403).json({accepted:false,error:"invalid_signature"});
 let event;try{event=typeof req.body==="object"?req.body:JSON.parse(raw)}catch{return res.status(400).json({accepted:false,error:"invalid_json"})}
 const eventId=event?.event_id||event?.id;
 if(!eventId)return res.status(400).json({accepted:false,error:"missing_event_id"});
 return res.status(200).json({accepted:true,eventId,type:event?.type||null,mode:"validated-ingress",fulfillment:"held",reason:"durable_idempotency_store_not_yet_configured"});
}