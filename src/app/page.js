import HeroSection from "@/components/HeroSection";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsSection from "@/components/StatsSection";
import ServicesPreview from "@/components/ServicesPreview";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import SeoContent from "@/components/SeoContent";
import { fetchHomeData } from "@/lib/data-fetcher-server";

export const revalidate = 3600;

export default async function Home({ city = "" }) {
  let homeData = null;
  try {
    const raw = await fetchHomeData();
    homeData = raw ? JSON.parse(JSON.stringify(raw)) : null;
  } catch (err) {
    console.error("Failed to load home data on server:", err);
  }

  return (
    <>
      <HeroSection city={city} initialHeroData={homeData} />
      <WhyChooseUs city={city} />
      <ServicesPreview city={city} />
      <TrustedBrands city={city} />
      <StatsSection city={city} />
      <SeoContent city={city} />
      <Testimonials city={city} />
      <CTASection city={city} />
    </>
  );
}
