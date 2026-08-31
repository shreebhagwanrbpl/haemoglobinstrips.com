import HeroSection from "@/components/HeroSection";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsSection from "@/components/StatsSection";
import ServicesPreview from "@/components/ServicesPreview";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import SeoContent from "@/components/SeoContent";

export default function Home({ city = "" }) {
  return (
    <div className="site4-static">
      <HeroSection city={city} />
      <WhyChooseUs city={city} />
      <ServicesPreview city={city} />
      <TrustedBrands city={city} />
      <StatsSection city={city} />
      <SeoContent city={city} />
      <Testimonials city={city} />
      <CTASection city={city} />
    </div>
  );
}
