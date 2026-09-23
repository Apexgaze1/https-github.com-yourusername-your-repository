import type { Config } from "@netlify/functions";

const products:Record<string,any>={
 "NHG-TEC-001":{cjSku:"CJGJ1734054-Gray",variant:"Gray",quantity:1},
 "NHG-UTR-003":{cjSku:"CJYD198735501AZ",variant:"Red Turner Frame / 1PCS",quantity:1},
 "NHG-RFO-011":{cjSku:"CJYD208536601AZ",variant:"White / 1PCS",quantity:1},
 "NHG-SNK-012":{cjSku:"CJYD207339601AZ",variant:"Upgraded Black Left",quantity:1},
 "NHG-VSL-013":{cjSku:"CJJT169443501AZ",variant:"Green and white",quantity:1}
};

export default async (req:Request)=>{
 if(req.method!=="POST") return new Response("Method Not Allowed",{status:405});
 let body:any; try{body=await req.json()}catch{return Response.json({ok:false,error:"invalid_json"},{status:400})}
 const code=String(body?.productCode||"");
 const product=products[code];
 if(!product) return Response.json({ok:false,error:"product_not_approved_for_auto_fulfillment",productCode:code},{status:422});
 const quantity=Number(body?.quantity??1);
 if(quantity!==product.quantity) return Response.json({ok:false,error:"quantity_mismatch",expected:product.quantity},{status:422});
 return Response.json({ok:true,productCode:code,mapping:product,action:"validated_only",supplierSubmission:false});
};
export const config:Config={path:"/api/fulfillment/validate"};
