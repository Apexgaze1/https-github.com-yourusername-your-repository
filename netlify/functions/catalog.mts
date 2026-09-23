import type { Config } from "@netlify/functions";

const products = [
 {nhg:"NHG-TEC-001",name:"Double-Layer Tech Organizer",cj:"CJGJ1734054-Gray",variant:"Gray",qty:1},
 {nhg:"NHG-UTR-003",name:"Silicone Utensil Rest",cj:"CJYD198735501AZ",variant:"Red Turner Frame / 1PCS",qty:1},
 {nhg:"NHG-RFO-011",name:"Refrigerator / Freezer Organizer",cj:"CJYD208536601AZ",variant:"White / 1PCS",qty:1},
 {nhg:"NHG-SNK-012",name:"Kitchen Sink Organizer",cj:"CJYD207339601AZ",variant:"Upgraded Black Left",qty:1},
 {nhg:"NHG-VSL-013",name:"Multifunction Vegetable Slicer",cj:"CJJT169443501AZ",variant:"Green and white",qty:1}
];

export default async () => Response.json({
  mode:"fail-closed",
  autoFulfillmentAllowList:products,
  unmappedProducts:"manual-review"
});

export const config: Config = { path: "/api/catalog" };
