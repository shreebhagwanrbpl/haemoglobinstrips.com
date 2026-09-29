import ProductDetails from "../../../items/[slug]/ProductDetails";
import { fetchFullCatalog, fetchDistrictData } from "@/lib/data-fetcher-server";
import { notFound } from "next/navigation";
import { buildMetadata, buildBreadcrumbSchema } from "@/lib/seo";

export const revalidate = 3600; // Revalidate cache every hour

async function getData(slug, districtSlug) {
  const [allProducts, districtData] = await Promise.all([
    fetchFullCatalog(),
    fetchDistrictData(districtSlug),
  ]);

  const product = allProducts.find((p) => p.slug === slug);

  return {
    product: product || null,
    districtData: districtData || null,
  };
}

export async function generateMetadata({ params }) {
  const { slug, district } = await params;
  const { product, districtData } = await getData(slug, district);

  if (!product || !districtData) {
    return {
      title: "Product Not Found | Raj Biosis",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const districtName = districtData.district || district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const stateName = districtData.state || "India";

  const title = `${product.title} Supplier in ${districtName} | Price, Specs & Quote | Raj Biosis`;
  const description = `Buy ${product.title} at best price in ${districtName}, ${stateName}. Trusted local supplier, dealer, and distributor of ${product.title} (${product.brand || "Raj Biosis"} ${product.model || ""}) for labs, hospitals, and clinics.`;

  return buildMetadata({
    title,
    description,
    path: `/${district}/items/${slug}`,
    keywords: [
      product.title,
      `${product.title} Supplier in ${districtName}`,
      `${product.title} Dealer in ${districtName}`,
      `${product.title} Price in ${districtName}`,
      `${product.title} ${districtName}`,
      "Biomedical Equipment Distributor",
    ],
  });
}

export default async function Page({ params }) {
  const { slug, district } = await params;
  const { product, districtData } = await getData(slug, district);

  if (!product || !districtData) {
    notFound();
  }

  const districtName = districtData.district || district;
  const stateName = districtData.state || "India";

  // Generate dynamic schemas
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${product.title} in ${districtName}`,
    "image": product.images || [product.image || "/placeholder.svg"],
    "description": product.description || product.desc || `Buy high quality ${product.title} in ${districtName}, ${stateName} from Raj Biosis.`,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Raj Biosis",
    },
    "model": product.model || "",
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: districtName, path: `/${district}` },
    { name: "Products", path: `/${district}/items` },
    { name: product.title, path: `/${district}/items/${slug}` },
  ]);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Raj Biosis - ${districtName} Supplier`,
    "description": `Biomedical, laboratory and diagnostic equipment supplier in ${districtName}, ${stateName}.`,
    "telephone": "+91-9983123469",
    "url": `https://haemoglobinstrips.com/${district}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": districtName,
      "addressRegion": stateName,
      "addressCountry": "IN",
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": districtName,
    },
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ProductDetails
        slug={slug}
        district={district}
        initialProduct={product}
      />
    </>
  );
}
