import ProductDetails from "./ProductDetails";
import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import { notFound } from "next/navigation";
import { buildMetadata, buildBreadcrumbSchema } from "@/lib/seo";

export const revalidate = 3600; // Revalidate every hour

async function getProduct(slug) {
  const allProducts = await fetchFullCatalog();
  const found = allProducts.find((p) => p.slug === slug);
  return found || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found | Raj Biosis",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${product.title} Supplier in India | Price, Specs & Quotation | Raj Biosis`;
  const description = `Buy ${product.title} at best price in India. Trusted supplier, dealer, and distributor of ${product.title} (${product.brand || "Raj Biosis"} ${product.model || ""}) for hospitals, laboratories, and diagnostics. Request quotes.`;

  return buildMetadata({
    title,
    description,
    path: `/items/${slug}`,
    keywords: [
      product.title,
      `${product.title} Supplier`,
      `${product.title} Dealer`,
      `${product.title} Distributor`,
      `${product.title} Price`,
      product.brand,
      product.model,
      "Biomedical Equipment India",
    ].filter(Boolean),
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Generate Schemas Server-Side
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": product.images || [product.image || "/placeholder.svg"],
    "description": product.description || product.desc || `Premium quality ${product.title} for medical laboratory and hospital use.`,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Raj Biosis",
    },
    "model": product.model || "",
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Products", path: "/items" },
    { name: product.title, path: `/items/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetails slug={slug} initialProduct={product} />
    </>
  );
}
