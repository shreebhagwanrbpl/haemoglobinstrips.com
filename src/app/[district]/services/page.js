import ServicesClient from "@/app/services/ServicesClient";
import { fetchServicesData, fetchDistrictData } from "@/lib/data-fetcher-server";
import { notFound } from "next/navigation";
import { buildMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import PageBanner from "@/components/PageBanner";

export const revalidate = 3600; // Revalidate cache every hour

async function getData(districtSlug) {
  const [servicesData, districtData] = await Promise.all([
    fetchServicesData(),
    fetchDistrictData(districtSlug),
  ]);

  return {
    services: servicesData?.services || [],
    districtData: districtData || null,
  };
}

export async function generateMetadata({ params }) {
  const { district } = await params;
  const { districtData } = await getData(district);

  if (!districtData) {
    return {
      title: "Services Not Found | Raj Biosis",
      robots: { index: false, follow: false },
    };
  }

  const districtName = districtData.district || district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const stateName = districtData.state || "India";

  return buildMetadata({
    title: `Biomedical Equipment Services in ${districtName} | Raj Biosis`,
    description: `Expert biomedical and laboratory equipment maintenance, calibration, installation and AMC services in ${districtName}, ${stateName} by Raj Biosis.`,
    path: `/${district}/services`,
  });
}

export default async function Page({ params }) {
  const { district } = await params;
  const { services, districtData } = await getData(district);

  if (!districtData) {
    notFound();
  }

  const districtName = districtData.district || district;
  const stateName = districtData.state || "India";

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: districtName, path: `/${district}` },
    { name: "Services", path: `/${district}/services` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageBanner
        title={`Services in ${districtName}`}
        subtitle={`Delivering trusted biomedical services, technical support, and equipment calibration in ${districtName}, ${stateName}.`}
      />
      <ServicesClient initialServices={services} districtData={districtData} />
    </>
  );
}
