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

async function getCategoryData(slug) {
  const allProducts = await fetchFullCatalog();
  const matchingProducts = allProducts.filter(
    (p) => slugify(p.category) === slug || slugify(p.subCategory) === slug
  );

  if (matchingProducts.length === 0) return null;

  // Extract category name
  const firstMatch = matchingProducts[0];
  const categoryName =
    slugify(firstMatch.category) === slug
      ? firstMatch.category
      : firstMatch.subCategory;

  return {
    categoryName,
    products: matchingProducts,
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getCategoryData(slug);

  if (!data) {
    return {
      title: "Category Not Found | Raj Biosis",
      robots: { index: false, follow: false },
    };
  }

  const { categoryName } = data;
  const title = `${categoryName} Supplier in India | Price & Specifications | Raj Biosis`;
  const description = `Find a wide range of ${categoryName} at best prices. Trusted supplier, dealer, and distributor of premium ${categoryName} for diagnostic laboratories and hospitals.`;

  return buildMetadata({
    title,
    description,
    path: `/category/${slug}`,
    keywords: [
      categoryName,
      `${categoryName} Price`,
      `Buy ${categoryName}`,
      `${categoryName} Supplier`,
      `${categoryName} Dealer`,
      "Laboratory Equipment India",
    ],
  });
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const data = await getCategoryData(slug);

  if (!data) {
    notFound();
  }

  const { categoryName, products } = data;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Products", path: "/items" },
    { name: categoryName, path: `/category/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageBanner
        title={categoryName}
        subtitle={`Premium selection of high-performance ${categoryName.toLowerCase()} for clinical diagnostics and hospital laboratories.`}
      />

      {/* Products list */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5">
          <SectionTitle
            badge="Category Products"
            title={`Explore Premium ${categoryName}`}
            description={`Find verified, high-precision biomedical ${categoryName.toLowerCase()} from global brands with reliable service support.`}
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
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Buying Guide & Applications of {categoryName}
          </h2>
          <p className="text-slate-600 leading-8 text-lg mb-6">
            {categoryName} plays a vital role in medical laboratory workflows, enabling
            accurate diagnosis, diagnostic analysis, and clinical research. Hospitals,
            pathology labs, and specialty healthcare centres require top-grade diagnostics
            systems to ensure reliable test outcomes and patient safety.
          </p>

          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">
            Key Considerations for {categoryName}:
          </h3>
          <ul className="list-disc pl-6 text-slate-600 space-y-3 leading-7 text-base">
            <li>
              <strong>Throughput & Speed:</strong> Ensure the equipment matches your sample
              load requirements.
            </li>
            <li>
              <strong>Automation level:</strong> Fully-automated vs semi-automated analyzers
              depending on lab size and operator availability.
            </li>
            <li>
              <strong>Reagent consumption:</strong> Open systems vs closed systems cost
              implications.
            </li>
            <li>
              <strong>Compliance & Certification:</strong> Verify manufacturer standards (ISO,
              CE) before purchase.
            </li>
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
