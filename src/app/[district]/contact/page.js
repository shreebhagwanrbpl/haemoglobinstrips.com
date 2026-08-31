import ContactClient from "@/app/contact/ContactClient";
import { fetchContactData, fetchDistrictData } from "@/lib/data-fetcher-server";
import { notFound } from "next/navigation";
import { buildMetadata, buildBreadcrumbSchema } from "@/lib/seo";

export const revalidate = 3600; // Revalidate cache every hour

async function getData(districtSlug) {
  const [contactData, districtData] = await Promise.all([
    fetchContactData(),
    fetchDistrictData(districtSlug),
  ]);

  return {
    contactInfo: contactData?.contactInfo || [],
    districtData: districtData || null,
  };
}

export async function generateMetadata({ params }) {
  const { district } = await params;
  const { districtData } = await getData(district);

  if (!districtData) {
    return {
      title: "Contact Not Found | Raj Biosis",
      robots: { index: false, follow: false },
    };
  }

  const districtName = districtData.district || district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const stateName = districtData.state || "India";

  return buildMetadata({
    title: `Contact Biomedical Equipment Supplier in ${districtName} | Raj Biosis`,
    description: `Contact Raj Biosis in ${districtName}, ${stateName} for medical laboratory analyzers, reagents, and technical support. Reach our customer team locally.`,
    path: `/${district}/contact`,
  });
}

export default async function Page({ params }) {
  const { district } = await params;
  const { contactInfo, districtData } = await getData(district);

  if (!districtData) {
    notFound();
  }

  const districtName = districtData.district || district;
  const stateName = districtData.state || "India";

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: districtName, path: `/${district}` },
    { name: "Contact", path: `/${district}/contact` },
  ]);

  return (
    <div className="site4-static">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactClient contactInfo={contactInfo} districtData={districtData} />
    </div>
  );
}