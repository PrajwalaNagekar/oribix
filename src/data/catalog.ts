import cement from "@/assets/cat-cement.jpg";
import steel from "@/assets/cat-steel.jpg";
import aggregates from "@/assets/cat-aggregates.jpg";
import blocks from "@/assets/cat-blocks.jpg";
import plumbing from "@/assets/cat-plumbing.jpg";
import electrical from "@/assets/cat-electrical.jpg";
import finishes from "@/assets/cat-finishes.jpg";
import essentials from "@/assets/cat-essentials.jpg";

export type Category = {
  slug: string;
  name: string;
  note: string;
  image: string;
};

export const categories: Category[] = [
  { slug: "cement", name: "Cement", note: "OPC, PPC & specialty", image: cement },
  { slug: "steel", name: "Steel", note: "TMT bars & structural", image: steel },
  { slug: "aggregates", name: "Aggregates", note: "Sand, stone & gravel", image: aggregates },
  { slug: "blocks", name: "Blocks & bricks", note: "AAC, concrete & clay", image: blocks },
  { slug: "plumbing", name: "Plumbing", note: "Pipes, tanks & fittings", image: plumbing },
  { slug: "electrical", name: "Electrical", note: "Wires, cables & conduit", image: electrical },
  { slug: "finishes", name: "Finishes", note: "Paint, tiles & surfaces", image: finishes },
  { slug: "essentials", name: "Site essentials", note: "Tools, safety & more", image: essentials },
];

export type Product = {
  name: string;
  category: string;
  unit: string;
  detail: string;
  image: string;
  badge?: string;
};

export const products: Product[] = [
  { name: "PPC Cement", category: "cement", unit: "Bags & bulk loads", detail: "For masonry, plaster and general construction work.", image: cement, badge: "Bulk pricing" },
  { name: "OPC 53 Grade Cement", category: "cement", unit: "Bags & bulk loads", detail: "Higher early strength for structural concrete.", image: cement },
  { name: "Fe 550 TMT Steel", category: "steel", unit: "Multiple diameters", detail: "High-strength reinforcement bars for structural work.", image: steel, badge: "Popular" },
  { name: "Structural Steel Sections", category: "steel", unit: "By tonne", detail: "Angles, channels and beams for fabrication.", image: steel },
  { name: "M-Sand", category: "aggregates", unit: "By tonne or truck", detail: "Consistent-grade manufactured sand for plaster and concrete.", image: aggregates },
  { name: "20mm Stone Aggregate", category: "aggregates", unit: "By tonne or truck", detail: "Graded coarse aggregate for concrete mixes.", image: aggregates },
  { name: "AAC Blocks", category: "blocks", unit: "Project quantities", detail: "Lightweight autoclaved blocks for faster walling.", image: blocks, badge: "Bulk pricing" },
  { name: "Red Clay Bricks", category: "blocks", unit: "Per thousand", detail: "Traditional walling bricks in project volumes.", image: blocks },
  { name: "UPVC Pipes", category: "plumbing", unit: "Multiple sizes", detail: "Durable water supply and drainage lines.", image: plumbing },
  { name: "Water Tanks & Fittings", category: "plumbing", unit: "Per unit", detail: "Storage tanks, valves and connectors for site plumbing.", image: plumbing },
  { name: "Copper House Wire", category: "electrical", unit: "Coils & cartons", detail: "Reliable wiring for residential and commercial work.", image: electrical, badge: "Popular" },
  { name: "Conduit & Accessories", category: "electrical", unit: "Bundles", detail: "Conduit pipes, bends and boxes for electrical runs.", image: electrical },
  { name: "Interior & Exterior Paint", category: "finishes", unit: "Buckets & drums", detail: "Wall finishes for handover-ready projects.", image: finishes },
  { name: "Vitrified Floor Tiles", category: "finishes", unit: "By box or sqft", detail: "Floor and wall tiles in project quantities.", image: finishes },
  { name: "Safety Kits", category: "essentials", unit: "Per kit", detail: "Helmets, gloves and site safety gear for crews.", image: essentials },
  { name: "Mason Tools", category: "essentials", unit: "Per set", detail: "Trowels, tapes and everyday site tools.", image: essentials },
];
