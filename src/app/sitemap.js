import { fetchFullCatalog, fetchAllDistricts } from "@/lib/data-fetcher-server";

export const revalidate = 3600; // Revalidate cache every hour

const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

function getProductSeoScore(product) {
  let score = 20; // 20/20 Technical SEO default (dynamic head tags, canonicals)

  // Content Quality (20)
  const desc = product.description || product.desc || "";
  if (desc.length > 100) score += 20;
  else if (desc.length > 20) score += 10;

  // Search Intent & Specifications (15)
  if (product.brand && product.model) score += 15;
  else if (product.brand || product.model) score += 10;

  // Internal Linking (10)
  score += 10;

  // Metadata completeness (10)
  if (product.title) score += 10;

  // Structured Data (10)
  score += 10;

  // Technical performance (5)
  score += 5;

  // Image quality/presence (5)
  if (product.image || product.images?.length > 0) score += 5;

  // Local relevance (5)
  score += 5;

  return score;
}

export default async function sitemap() {
  const baseUrl = "https://haemoglobinstrips.com";
  const urls = [];

  // 1. Static Pages
  const staticPaths = ["", "/about", "/services", "/contact", "/items"];
  staticPaths.forEach((path) => {
    urls.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
    });
  });

  try {
    // Fetch products and districts on server
    const [allProducts, districts] = await Promise.all([
      fetchFullCatalog(),
      fetchAllDistricts(),
    ]);

    // Apply SEO Quality Gate filter
    const highQualityProducts = allProducts.filter((product) => {
      const score = getProductSeoScore(product);
      return score >= 50; // Quality gate threshold
    });

    // 2. Category Landing Pages
    const categories = new Set();
    allProducts.forEach((p) => {
      if (p.category) categories.add(slugify(p.category));
      if (p.subCategory) categories.add(slugify(p.subCategory));
    });
    categories.forEach((catSlug) => {
      if (catSlug) {
        urls.push({
          url: `${baseUrl}/category/${catSlug}`,
          lastModified: new Date(),
        });
      }
    });

    // 3. Brand Landing Pages
    const brands = new Set();
    allProducts.forEach((p) => {
      if (p.brand) brands.add(slugify(p.brand));
    });
    brands.forEach((brandSlug) => {
      if (brandSlug) {
        urls.push({
          url: `${baseUrl}/brand/${brandSlug}`,
          lastModified: new Date(),
        });
      }
    });

    // 4. District Landing Pages
    districts.forEach((district) => {
      if (district.slug) {
        urls.push({
          url: `${baseUrl}/${district.slug}`,
          lastModified: new Date(),
        });
        urls.push({
          url: `${baseUrl}/${district.slug}/about`,
          lastModified: new Date(),
        });
        urls.push({
          url: `${baseUrl}/${district.slug}/services`,
          lastModified: new Date(),
        });
        urls.push({
          url: `${baseUrl}/${district.slug}/contact`,
          lastModified: new Date(),
        });
        urls.push({
          url: `${baseUrl}/${district.slug}/items`,
          lastModified: new Date(),
        });
      }
    });

    // 5. Product Dynamic Pages (Main & Localized top products)
    // Sort products by SEO score to identify the top products
    const sortedProducts = [...highQualityProducts].sort(
      (a, b) => getProductSeoScore(b) - getProductSeoScore(a)
    );

    highQualityProducts.forEach((product) => {
      if (product.slug) {
        urls.push({
          url: `${baseUrl}/items/${product.slug}`,
          lastModified: new Date(),
        });
      }
    });

    // To prevent exceeding sitemap limits (50k) and avoid indexing thin duplicate location-product pages,
    // we only index the top 5 highest-scoring products across all serving districts.
    const topProducts = sortedProducts.slice(0, 5);
    districts.forEach((district) => {
      if (district.slug) {
        topProducts.forEach((product) => {
          if (product.slug) {
            urls.push({
              url: `${baseUrl}/${district.slug}/items/${product.slug}`,
              lastModified: new Date(),
            });
          }
        });
      }
    });
  } catch (error) {
    console.error("Sitemap Generation Error:", error);
  }

  return urls;
}