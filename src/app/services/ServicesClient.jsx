"use client";

import { useState, useEffect } from "react";
import { WEBSITE_ID } from "@/lib/catalog-utils";
import { db, doc, collection, getDoc, getDocs, addDoc, onSnapshot } from "@/lib/firestore-shim";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";

export default function ServicesClient({ initialServices = [], districtData = null }) {
  const [services, setServices] = useState(initialServices);
  const [loading, setLoading] = useState(initialServices.length === 0);

  const cityName = districtData?.district || "";

  const icons = [
    <Microscope key="0" size={30} />,
    <FlaskConical key="1" size={30} />,
    <ShieldCheck key="2" size={30} />,
    <Stethoscope key="3" size={30} />,
    <Wrench key="4" size={30} />,
    <Activity key="5" size={30} />,
  ];

  useEffect(() => {
    if (initialServices.length > 0) return;

    const fetchServices = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", WEBSITE_ID, "pages", "services")
        );
        if (snap.exists()) {
          setServices(snap.data().services || []);
        }
      } catch (error) {
        console.error("Error loading services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [initialServices]);

  return (
    <>
      {/* Services List Section */}
      {!loading && services.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container-custom">
            <SectionTitle
              badge="Clinical Consumables Services"
              title={cityName ? `Biomedical Support Services in ${cityName}` : "Comprehensive Biomedical Support"}
              description={cityName ? `We provide technical service, AMC contracts, calibration and maintenance support for medical laboratories and clinics in ${cityName}.` : "We provide expert technical support, AMC maintenance, calibration and installation support for laboratory instruments."}
              center
            />

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={icons[index % icons.length]}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Working Process */}
      <section className="relative overflow-hidden section-padding bg-gradient-to-b from-white via-violet-50 to-white">
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
                desc: "Understanding healthcare requirements and diagnostics needs.",
              },
              {
                step: "02",
                title: "Implementation",
                desc: "Delivering biomedical equipment and technical setup.",
              },
              {
                step: "03",
                title: "Support",
                desc: "Providing maintenance and healthcare assistance.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[32px] border border-violet-100 bg-white p-8 shadow-[0_18px_50px_rgba(91,33,182,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-[0_25px_60px_rgba(91,33,182,0.18)]"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-100/40 blur-2xl transition-all duration-300 group-hover:bg-violet-200/60"></div>
                <span className="relative text-6xl font-extrabold text-violet-200 transition-all duration-300 group-hover:text-violet-700">
                  {item.step}
                </span>
                <h3 className="relative mt-6 text-2xl font-bold text-[#1F2937] transition-colors duration-300 group-hover:text-violet-700">
                  {item.title}
                </h3>
                <p className="relative mt-4 leading-7 text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
