"use client";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const icons = [
    <Microscope size={30} />,
    <FlaskConical size={30} />,
    <ShieldCheck size={30} />,
    <Stethoscope size={30} />,
    <Wrench size={30} />,
    <Activity size={30} />,
  ];
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "services"
          )
        );

        if (snap.exists()) {
          setServices(snap.data().services || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Our Services"
        subtitle="Delivering trusted biomedical and diagnostic services with innovation, precision, and healthcare excellence."
      />

      {/* Services Grid */}
      <section className="relative overflow-hidden section-padding bg-gradient-to-b from-white via-violet-50 to-white">

        {/* Background Blur */}
        <div className="absolute -top-10 left-0 h-72 w-72 rounded-full bg-violet-200/20 blur-[120px]" />
        <div className="absolute -bottom-10 right-0 h-72 w-72 rounded-full bg-purple-200/20 blur-[120px]" />

        <div className="container-custom relative z-10">

          <SectionTitle
            badge="What We Offer"
            title="Premium Biomedical Services"
            description="We provide innovative healthcare and biomedical solutions tailored to modern diagnostics and laboratory excellence."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-[30px] border border-violet-100 bg-white p-10 shadow-[0_15px_45px_rgba(91,33,182,0.08)]"
                >

                  {/* Icon Skeleton */}
                  <div className="mb-8 h-20 w-20 animate-pulse rounded-3xl bg-gradient-to-br from-violet-100 to-violet-200"></div>

                  {/* Title Skeleton */}
                  <div className="mb-6 h-8 w-3/4 animate-pulse rounded-lg bg-gradient-to-r from-violet-100 to-violet-200"></div>

                  {/* Description Skeleton */}
                  <div className="space-y-3">

                    <div className="h-4 animate-pulse rounded bg-violet-100"></div>

                    <div className="h-4 w-11/12 animate-pulse rounded bg-violet-100"></div>

                    <div className="h-4 w-8/12 animate-pulse rounded bg-violet-100"></div>

                  </div>

                </div>
              ))
              : services.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={icons[index]}
                  title={service.title}
                  description={service.desc}
                />
              ))}

          </div>

        </div>

      </section>

      {/* Working Process */}
      <section className="relative overflow-hidden section-padding bg-gradient-to-b from-white via-violet-50 to-white">

        {/* Background Blur */}
        <div className="absolute -top-10 left-0 h-72 w-72 rounded-full bg-violet-200/20 blur-[120px]" />
        <div className="absolute -bottom-10 right-0 h-72 w-72 rounded-full bg-purple-200/20 blur-[120px]" />

        <div className="container-custom relative z-10">

          <SectionTitle
            badge="How We Work"
            title="Simple & Professional Process"
            description="We follow a streamlined process to ensure reliable biomedical and healthcare solutions."
            center
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-3">

            {[
              {
                step: "01",
                title: "Consultation",
                desc:
                  "Understanding healthcare requirements and diagnostics needs.",
              },
              {
                step: "02",
                title: "Implementation",
                desc:
                  "Delivering biomedical equipment and technical setup.",
              },
              {
                step: "03",
                title: "Support",
                desc:
                  "Providing maintenance and healthcare assistance.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="group relative overflow-hidden rounded-[32px] border border-violet-100 bg-white p-8 shadow-[0_18px_50px_rgba(91,33,182,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-[0_25px_60px_rgba(91,33,182,0.18)]"
              >

                {/* Decorative Circle */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-100/40 blur-2xl transition-all duration-300 group-hover:bg-violet-200/60"></div>

                {/* Step Number */}
                <span className="relative text-6xl font-extrabold text-violet-200 transition-all duration-300 group-hover:text-violet-700">
                  {item.step}
                </span>

                {/* Title */}
                <h3 className="relative mt-6 text-2xl font-bold text-[#1F2937] transition-colors duration-300 group-hover:text-violet-700">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="relative mt-4 leading-7 text-slate-600">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}