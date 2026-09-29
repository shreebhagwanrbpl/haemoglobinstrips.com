import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import { notFound } from "next/navigation";
import { buildMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import ProductCard from "@/components/ProductCard";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";

export const revalidate = 3600; // Revalidate every hour

const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

async function getBrandData(slug) {
  const allProducts = await fetchFullCatalog();
  const matchingProducts = allProducts.filter(
    (p) => p.brand && slugify(p.brand) === slug
  );

  if (matchingProducts.length === 0) return null;

  const brandName = matchingProducts[0].brand;

  return {
    brandName,
    products: matchingProducts,
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getBrandData(slug);

  if (!data) {
    return {
      title: "Brand Not Found | Raj Biosis",
      robots: { index: false, follow: false },
    };
  }

  const { brandName } = data;
  const title = `${brandName} Laboratory & Diagnostic Equipment | Raj Biosis`;
  const description = `Discover premium biomedical and pathology products from ${brandName}. Authorized supplier, dealer and distributor of ${brandName} products in India.`;

  return buildMetadata({
    title,
    description,
    path: `/brand/${slug}`,
    keywords: [
      brandName,
      `${brandName} Supplier`,
      `${brandName} Dealer`,
      `${brandName} Analyzer`,
      `${brandName} Reagents`,
      `Buy ${brandName} India`,
    ],
  });
}

export default async function BrandPage({ params }) {
  const { slug } = await params;
  const data = await getBrandData(slug);

  if (!data) {
    notFound();
  }

  const { brandName, products } = data;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Brands", path: "/items" },
    { name: brandName, path: `/brand/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageBanner
        title={`${brandName} Equipment`}
        subtitle={`Buy genuine, high-quality laboratory analyzers, reagents and diagnostic equipment manufactured by ${brandName}.`}
      />

      {/* Brand Products list */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <SectionTitle
            badge="Brand Catalog"
            title={`${brandName} Diagnostic Products`}
            description={`Explore medical laboratory solutions, chemistry analyzers, cell counters and test reagents from ${brandName}.`}
            center
          />

          <div className="grid gap-8 mt-16 max-w-5xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product.uid} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Topical description section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            About {brandName} Diagnostic & Medical Systems
          </h2>
          <p className="text-slate-600 leading-8 text-lg mb-6">
            {brandName} is a globally recognized manufacturer of clinical diagnostic systems
            and laboratory equipment. Healthcare facilities, pathology centres, and hospital
            clinics across India rely on {brandName} for superior testing accuracy, operational
            reliability, and advanced medical diagnostics.
          </p>
          <p className="text-slate-600 leading-8 text-lg">
            At Raj Biosis, we supply genuine {brandName} systems with complete installation
            assistance, technical training, warranty, and customer support. Contact our sales
            office today to request pricing quotes and product availability.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
