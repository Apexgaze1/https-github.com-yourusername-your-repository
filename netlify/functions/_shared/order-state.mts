import { getStore, getDeployStore } from "@netlify/blobs";

export function orderStore(){
  const production = Netlify.context?.deploy?.context === "production";
  return production ? getStore("neatharbor-orders",{consistency:"strong"}) : getDeployStore("neatharbor-orders");
}

export async function claimEvent(eventId:string,payload:any){
  const store=orderStore();
  const key="square-event/"+eventId;
  const existing=await store.get(key,{type:"json"});
  if(existing) return {duplicate:true,state:existing};
  const state={eventId,status:"validated",receivedAt:new Date().toISOString(),payload};
  await store.setJSON(key,state);
  return {duplicate:false,state};
}
