import site from "@/data/site.json";
import eco from "@/data/ecosystem/cards.json";
import products from "@/data/products/cards.json";
import vision from "@/data/pages/vision2035.json";

export type EcosystemCard = { title: string; body: string };
export type ProductCard = { name: string; desc: string };

export const getSite = () => site;
export const getEcosystem = (): EcosystemCard[] => eco as EcosystemCard[];
export const getProducts = (): ProductCard[] => products as ProductCard[];
export const getVision = () => vision as { title: string; points: string[] };
