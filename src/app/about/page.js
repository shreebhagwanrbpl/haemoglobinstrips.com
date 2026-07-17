import Image from "next/image";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import DDS from "@/components/img/Dds.png";

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="About Central Biomedicals"
        subtitle="Delivering trusted diagnostic and biomedical technologies with innovation, quality, and healthcare precision."
      />

      {/* About Section */}
      <section className="relative overflow-hidden section-padding bg-gradient-to-b from-white via-violet-50 to-white">

        {/* Background Blur */}
        <div className="absolute -top-10 left-0 h-72 w-72 rounded-full bg-violet-200/20 blur-[120px]" />
        <div className="absolute -bottom-10 right-0 h-72 w-72 rounded-full bg-purple-200/20 blur-[120px]" />

        <div className="container-custom relative z-10 grid items-center gap-16 lg:grid-cols-2">

          {/* Left Image */}
          <div className="relative">

            <div className="flex h-[600px] items-center justify-center overflow-hidden rounded-[40px] border border-violet-100 bg-white p-10 shadow-[0_25px_70px_rgba(91,33,182,0.10)]">
              <Image
                src={DDS}
                alt="About"
                width={1200}
                height={900}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-8 left-8 hidden rounded-[28px] border border-violet-100 bg-white px-8 py-6 shadow-[0_20px_50px_rgba(91,33,182,0.15)] lg:block">

              <h3 className="text-4xl font-extrabold text-violet-700">
                10+
              </h3>

              <p className="mt-1 text-slate-500">
                Years of Excellence
              </p>

            </div>

          </div>

          {/* Right Content */}
          <div>

            <SectionTitle
              badge="Who We Are"
              title="Trusted Partner in Biomedical & Diagnostics"
              description="We provide advanced diagnostic and biomedical solutions focused on healthcare innovation, laboratory precision, and modern medical excellence."
            />

            <p className="mt-8 leading-8 text-slate-600">
              At Central Biomedicals, we are committed to delivering
              premium-quality healthcare and biomedical technologies
              designed to improve diagnostics, laboratory performance,
              and medical efficiency.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              Our mission is to empower healthcare professionals with
              trusted equipment, expert consultation, and innovative
              biomedical support.
            </p>

            {/* Feature Cards */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2">

              <div className="group rounded-3xl border border-violet-100 bg-white p-6 shadow-[0_12px_35px_rgba(91,33,182,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-[0_20px_50px_rgba(91,33,182,0.15)]">

                <h4 className="text-xl font-bold text-[#1F2937] transition-colors group-hover:text-violet-700">
                  Premium Equipment
                </h4>

                <p className="mt-3 leading-7 text-slate-600">
                  High-end diagnostic technologies designed for
                  accurate and reliable healthcare solutions.
                </p>

              </div>

              <div className="group rounded-3xl border border-violet-100 bg-white p-6 shadow-[0_12px_35px_rgba(91,33,182,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-[0_20px_50px_rgba(91,33,182,0.15)]">

                <h4 className="text-xl font-bold text-[#1F2937] transition-colors group-hover:text-violet-700">
                  Expert Support
                </h4>

                <p className="mt-3 leading-7 text-slate-600">
                  Trusted consultation and technical assistance for
                  hospitals, laboratories, and healthcare providers.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}