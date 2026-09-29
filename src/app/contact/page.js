import ContactClient from "./ContactClient";
import { fetchContactData } from "@/lib/data-fetcher-server";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600; // Revalidate cache every hour

export async function generateMetadata() {
  return buildMetadata({
    title: "Contact Raj Biosis | Biomedical Equipment Supplier in India",
    description: "Contact Raj Biosis for medical laboratory equipment, diagnostic analyzers, rapid test kits and technical support. Request quotations from our sales team.",
    path: "/contact",
  });
}

export default async function ContactPage() {
  let contactInfo = [];
  try {
    const data = await fetchContactData();
    contactInfo = data?.contactInfo ? JSON.parse(JSON.stringify(data.contactInfo)) : [];
  } catch (err) {
    console.error("Failed to load contact details on server:", err);
  }

  return <ContactClient contactInfo={contactInfo} />;
}
