import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductsClient from "./ProductsClient";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store"; // Revalidate cache every hour

export async function generateMetadata() {
  return buildMetadata({
    title: "Premium Biomedical & Laboratory Equipment Catalog | Raj Biosis",
    description: "Explore our complete catalog of medical laboratory instruments, biochemistry analyzers, rapid test kits, and clinical reagents in India.",
    path: "/items",
  });
}

export default async function ProductsPage({ district = null, city = null }) {
  // Fetch full catalog from server cache
  const allProducts = await fetchFullCatalog();

  return (
    <ProductsClient
      initialProducts={allProducts}
      district={district}
      city={city}
    />
  );
}
