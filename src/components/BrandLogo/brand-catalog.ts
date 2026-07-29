/**
 * Running & cycling brands for Runcycl listings.
 * Logo assets live in `svg/` — refresh via `pnpm fetch:brands`.
 */
export type BrandCategory = "running" | "cycling" | "electronics";

export interface BrandCatalogEntry {
  /** Stable slug for `BrandLogo` (`brand` prop) */
  id: string;
  /** Display name */
  name: string;
  /** Primary domain — used when refreshing assets via Brandfetch MCP */
  domain: string;
  category: BrandCategory;
}

export const BRAND_CATALOG = [
  // Running — footwear & apparel
  { id: "nike", name: "Nike", domain: "nike.com", category: "running" },
  { id: "adidas", name: "adidas", domain: "adidas.com", category: "running" },
  { id: "asics", name: "ASICS", domain: "asics.com", category: "running" },
  { id: "new-balance", name: "New Balance", domain: "newbalance.com", category: "running" },
  { id: "saucony", name: "Saucony", domain: "saucony.com", category: "running" },
  { id: "brooks", name: "Brooks", domain: "brooksrunning.com", category: "running" },
  { id: "hoka", name: "HOKA", domain: "hoka.com", category: "running" },
  { id: "on", name: "On", domain: "on-running.com", category: "running" },
  { id: "salomon", name: "Salomon", domain: "salomon.com", category: "running" },
  { id: "mizuno", name: "Mizuno", domain: "mizuno.com", category: "running" },
  { id: "altra", name: "Altra", domain: "altrarunning.com", category: "running" },
  { id: "puma", name: "Puma", domain: "puma.com", category: "running" },
  { id: "under-armour", name: "Under Armour", domain: "underarmour.com", category: "running" },
  { id: "decathlon", name: "Decathlon", domain: "decathlon.com", category: "running" },
  { id: "craft", name: "Craft", domain: "craftsportswear.com", category: "running" },
  { id: "merrell", name: "Merrell", domain: "merrell.com", category: "running" },

  // Electronics — watches & sensors
  { id: "garmin", name: "Garmin", domain: "garmin.com", category: "electronics" },
  { id: "coros", name: "COROS", domain: "coros.com", category: "electronics" },
  { id: "polar", name: "Polar", domain: "polar.com", category: "electronics" },
  { id: "suunto", name: "Suunto", domain: "suunto.com", category: "electronics" },
  { id: "wahoo", name: "Wahoo", domain: "wahoofitness.com", category: "electronics" },
  { id: "whoop", name: "WHOOP", domain: "whoop.com", category: "electronics" },
  { id: "apple", name: "Apple", domain: "apple.com", category: "electronics" },

  // Cycling — bikes & components
  { id: "specialized", name: "Specialized", domain: "specialized.com", category: "cycling" },
  { id: "trek", name: "Trek", domain: "trekbikes.com", category: "cycling" },
  { id: "cannondale", name: "Cannondale", domain: "cannondale.com", category: "cycling" },
  { id: "giant", name: "Giant", domain: "giant-bicycles.com", category: "cycling" },
  { id: "cervelo", name: "Cervélo", domain: "cervelo.com", category: "cycling" },
  { id: "pinarello", name: "Pinarello", domain: "pinarello.com", category: "cycling" },
  { id: "bianchi", name: "Bianchi", domain: "bianchi.com", category: "cycling" },
  { id: "scott", name: "Scott", domain: "scott-sports.com", category: "cycling" },
  { id: "shimano", name: "Shimano", domain: "shimano.com", category: "cycling" },
  { id: "sram", name: "SRAM", domain: "sram.com", category: "cycling" },
  { id: "castelli", name: "Castelli", domain: "castelli-cycling.com", category: "cycling" },
  { id: "rapha", name: "Rapha", domain: "rapha.cc", category: "cycling" },
  { id: "assos", name: "ASSOS", domain: "assos.com", category: "cycling" },
  { id: "mavic", name: "Mavic", domain: "mavic.com", category: "cycling" },
  { id: "giro", name: "Giro", domain: "giro.com", category: "cycling" },
  { id: "oakley", name: "Oakley", domain: "oakley.com", category: "cycling" },
] as const satisfies readonly BrandCatalogEntry[];

export type BrandId = (typeof BRAND_CATALOG)[number]["id"];

const brandById = new Map(BRAND_CATALOG.map((entry) => [entry.id, entry]));

export function getBrandCatalogEntry(id: BrandId): BrandCatalogEntry {
  const entry = brandById.get(id);
  if (!entry) {
    throw new Error(`Unknown brand id: ${id}`);
  }
  return entry;
}

export const BRAND_IDS = BRAND_CATALOG.map((entry) => entry.id) as BrandId[];
